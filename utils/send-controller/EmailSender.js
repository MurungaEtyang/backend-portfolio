import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load an email template and replace placeholders with dynamic values.
 * @param {string} filePath - The path to the HTML template file.
 * @param {object} replacements - Key-value pairs for placeholder replacements.
 * @returns {string} - The processed HTML content.
 */
function loadTemplate(filePath, replacements) {
    try {
        let template = fs.readFileSync(filePath, 'utf8');

        Object.keys(replacements).forEach(key => {
            const value = replacements[key];
            const regex = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(regex, value);
        });

        return template;
    } catch (error) {
        console.error('Error loading template:', error.message);
        throw error;
    }
}

/**
 * Send an email with the specified subject and body using a template.
 * @param {string} subject - The email subject.
 * @param {object} replacements - Placeholder replacements for the template.
 * @param receiverEmail - receiver email
 */
async function emailTransporter(subject, replacements, receiverEmail) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const templatePath = path.join(__dirname, '../templates/welcome-email.html');
        const htmlContent = loadTemplate(templatePath, replacements);

        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: receiverEmail,
            subject: subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
}

export default emailTransporter;
