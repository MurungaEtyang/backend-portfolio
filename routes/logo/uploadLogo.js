import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from '../../database/config.js'; // Replace with your actual database config

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const logoDirectory = path.join(__dirname, '../../public/images/logos');
        if (!fs.existsSync(logoDirectory)) {
            fs.mkdirSync(logoDirectory, { recursive: true });
        }
        cb(null, logoDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});

// File filter to restrict to image types
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

/**
 * @swagger
 * /api/kenf/management/kenf-logo/upload:
 *   post:
 *     summary: Upload a new logo
 *     description: Upload a logo file to the server.
 *     tags:
 *       - Logo
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: logo
 *         required: true
 *         type: file
 *         description: The logo file to upload.
 *     responses:
 *       200:
 *         description: Logo uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logo uploaded and path saved to database successfully.
 *                 file:
 *                   type: string
 *                   example: logo-1635172645321-image.png
 *       400:
 *         description: No file uploaded or invalid file type.
 *       500:
 *         description: Internal server error.
 */
router.post('/upload', (req, res, next) => {
    upload.single('logo')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer Error:', err);
            return res.status(400).json({ message: err.message });
        } else if (err) {
            console.error('Unexpected Error:', err);
            return res.status(500).json({ message: 'Unexpected error occurred.' });
        }
        next();
    });
}, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
    }

    const filePath = `/images/logos/${req.file.filename}`;
    const query = 'INSERT INTO logos (file_path) VALUES (?)';

    pool.query(query, [filePath], (err) => {
        if (err) {
            console.error('Error saving logo path to database:', err);
            return res.status(500).json({ message: 'Failed to save logo to database' });
        }
        res.status(200).json({
            message: 'Logo uploaded and path saved to database successfully.',
            file: req.file.filename,
        });
    });
});

export default router;
