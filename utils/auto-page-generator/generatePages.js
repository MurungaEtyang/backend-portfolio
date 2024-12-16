import fs from 'fs';
import path from 'path';

/**
 * Converts a page name to camel case for file naming.
 * @param {string} name - The original name of the page.
 * @returns {string} - The camel case version of the name.
 */
function toDashCase(name) {
    return name
        .split(' ')
        .join('-')
        .toLowerCase();
}

/**
 * Generates HTML files and corresponding directories for given pages.
 */
function generatePages(pages) {
    const outputDir = './public';
    console.log(`Output directory: ${outputDir}`);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created base directory: ${outputDir}`);
    }

    pages.forEach((page) => {
        const folderName = toDashCase(page.name);
        const folderPath = path.join(outputDir, folderName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            // console.log(`Created folder: ${folderPath}`);
        }

        const fileName = 'index.html';
        const filePath = path.join(folderPath, fileName);

        console.log(`Checking if file exists: ${filePath}`);
        if (fs.existsSync(filePath)) {
            // console.log(`File already exists: ${filePath}`);
            return;
        }

        const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.name}</title>
</head>
<body>
    <h1>Welcome to the ${page.name} Page</h1>
</body>
</html>
        `;

        console.log(`Writing file: ${filePath}`);
        fs.writeFileSync(filePath, content.trim());
        console.log(`Created file: ${filePath}`);
    });

    const folderName = 'page-not-found';
    const folderPath = path.join(outputDir, folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder: ${folderPath}`);
    }

    const fileName = 'index.html';
    const filePath = path.join(folderPath, fileName);

    console.log(`Checking if file exists: ${filePath}`);
    if (fs.existsSync(filePath)) {
        console.log(`File already exists: ${filePath}`);
        return;
    }

    const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found</title>
</head>
<body>
    <h1>Page Not Found</h1>
</body>
</html>
    `;

    console.log(`Writing file: ${filePath}`);
    fs.writeFileSync(filePath, content.trim());
    console.log(`Created file: ${filePath}`);
}

export default generatePages;