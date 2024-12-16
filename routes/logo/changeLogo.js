import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const logoDirectory = path.join(__dirname, '../../public/images/logos');
        cb(null, logoDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, `current-logo.jpg`);
    },
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/kenf/management/kenf-logo/change:
 *   put:
 *     summary: Replace the current logo
 *     description: Upload and replace the current logo file.
 *     tags:
 *       - logo
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: logo
 *         type: file
 *         required: true
 *         description: The new logo file to replace the current logo.
 *     responses:
 *       200:
 *         description: Logo replaced successfully.
 *       400:
 *         description: No file uploaded or invalid file type.
 *       500:
 *         description: Internal server error.
 */
router.put('/change', upload.single('logo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
    }

    res.status(200).json({
        message: 'Logo replaced successfully.',
        file: req.file.filename,
    });
});

export default router;
