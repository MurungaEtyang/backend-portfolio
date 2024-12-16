import fs from 'fs';
import path from 'path';

/**
 * Checks if the folder exists and serves the index.html if it does.
 * @param {string} folderName - The name of the folder to check.
 * @param {object} res - The response object to send the file.
 */
export function serveFolderIndex(folderName, res) {
    const folderPath = path.join(process.cwd(), 'public', folderName);

    fs.stat(folderPath, (err, stats) => {
        if (err || !stats.isDirectory()) {
            return res.status(404).send('Folder not found!');
        }

        const indexPath = path.join(folderPath, 'index.html');

        fs.stat(indexPath, (err) => {
            if (err) {
                return res.status(500).send('index.html file not found in this folder.');
            }

            res.sendFile(indexPath, (err) => {
                if (err) {
                    res.status(500).send('Error loading index.html');
                }
            });
        });
    });
}
