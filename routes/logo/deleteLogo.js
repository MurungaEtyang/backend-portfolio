import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoDirectory = path.join(__dirname, '../../public/images/logos');

/**
 * @swagger
 * /api/kenf/management/kenf-logo/delete:
 *   delete:
 *     summary: Delete the current logo
 *     description: Delete the existing logo file.
 *     tags:
 *       - logo
 *     responses:
 *       200:
 *         description: Logo deleted successfully.
 *       404:
 *         description: No logo found to delete.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete', (req, res) => {
    const logoPath = path.join(logoDirectory, 'current-logo.jpg');
    if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
        res.status(200).json({ message: 'Logo deleted successfully.' });
    } else {
        res.status(404).json({ message: 'No logo found to delete.' });
    }
});

export default router;
