import express from 'express';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoDirectory = path.join(__dirname, '../../public/images/logos');

/**
 * @swagger
 * /api/kenf/management/kenf-logo/view:
 *   get:
 *     summary: View the current logo
 *     description: Retrieve the current logo file.
 *     tags:
 *       - logo
 *     responses:
 *       200:
 *         description: Successfully retrieved the logo.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: No logo found to view.
 */

router.get('/view', (req, res) => {
    if (!fs.existsSync(logoDirectory)) {
        return res.status(404).json({ message: 'No logo directory found.' });
    }

    const files = fs.readdirSync(logoDirectory);

    if (files.length === 0) {
        return res.status(404).json({ message: 'No logo found to view.' });
    }

    const imageFiles = files.filter(file => {
        const mimeType = mime.lookup(file);
        return mimeType && mimeType.startsWith('image');
    });

    if (imageFiles.length === 0) {
        return res.status(404).json({ message: 'No valid image files found.' });
    }

    const latestFile = imageFiles
        .map(file => ({
            file,
            mtime: fs.statSync(path.join(logoDirectory, file)).mtime,
        }))
        .sort((a, b) => b.mtime - a.mtime)[0].file;

    const logoPath = path.join(logoDirectory, latestFile);
    res.sendFile(logoPath);
});


export default router;
