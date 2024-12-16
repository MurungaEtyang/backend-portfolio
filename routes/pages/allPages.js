import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticDir = path.join(__dirname, '..', '..', 'public');
const pagesDir = path.join(staticDir, '');

const router = express.Router();

/**
 * @swagger
 * /api/kenf/management/pages/{name}:
 *   get:
 *     summary: Retrieve a dynamically generated page
 *     description: Fetch the `index.html` file for a given page name if it exists.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the page folder
 *     responses:
 *       200:
 *         description: Successfully fetched the page.
 *       404:
 *         description: Page or file not found.
 */

router.get('/:name', (req, res) => {
    const pageName = req.params.name;
    const filePath = path.join(pagesDir, pageName, 'index.html');

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).sendFile(path.join(pagesDir, 'page-not-found', 'index.html'));
        }
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send({ error: 'Internal server error' });
            }
        });
    });
});

export default router;