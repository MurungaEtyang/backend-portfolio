import { Router } from "express";
import pool from "../../database/config.js";
const router = Router();


/**
 * @swagger
 * /api/kenf/management/body-setting/update-body-settings:
 *   post:
 *     summary: Update the body styling (background color, font, etc.)
 *     description: Allows users to update various styling properties like background color, font family, font size, text color, line height, and text alignment.
 *     tags:
 *         - body settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *                 description: The background color hex code
 *                 example: '#ffffff'
 *               font_family:
 *                 type: string
 *                 description: The font family for body text
 *                 example: 'Arial'
 *               font_size:
 *                 type: string
 *                 description: The font size for body text
 *                 example: '16px'
 *               font_color:
 *                 type: string
 *                 description: The font color for body text
 *                 example: '#000000'
 *               line_height:
 *                 type: string
 *                 description: The line height for text
 *                 example: '1.5'
 *               text_align:
 *                 type: string
 *                 description: The text alignment for the body content
 *                 example: 'left'
 *               text_color:
 *                 type: string
 *                 description: The color of the body text
 *                 example: '#000000'
 *     responses:
 *       200:
 *         description: Body styling updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Body settings updated successfully'
 *                 body_settings:
 *                   type: object
 *                   properties:
 *                     color:
 *                       type: string
 *                       example: '#ffffff'
 *                     font_family:
 *                       type: string
 *                       example: 'Arial'
 *                     font_size:
 *                       type: string
 *                       example: '16px'
 *                     font_color:
 *                       type: string
 *                       example: '#000000'
 *                     line_height:
 *                       type: string
 *                       example: '1.5'
 *                     text_align:
 *                       type: string
 *                       example: 'left'
 *                     text_color:
 *                       type: string
 *                       example: '#000000'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error updating body styling
 */

router.post('/update-body-settings', async (req, res) => {
    const { color, font_family, font_size, font_color, line_height, text_align, text_color } = req.body;

    if (!/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/.test(color)) {
        return res.status(400).send('Invalid color format. Please provide a valid hex color.');
    }

    const validFontSize = /^[0-9]+(px|em|rem|%)$/.test(font_size);
    if (!validFontSize) {
        return res.status(400).send('Invalid font size format. Please provide a valid size (e.g., "16px", "1rem").');
    }

    if (!/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/.test(text_color)) {
        return res.status(400).send('Invalid text color format. Please provide a valid hex color.');
    }

    try {
        const [existingSettings] = await pool.query('SELECT * FROM body_settings LIMIT 1');

        if (existingSettings.length > 0) {
            await pool.query(
                'UPDATE body_settings SET color = ?, font_family = ?, font_size = ?, font_color = ?, line_height = ?, text_align = ?, text_color = ? WHERE id = 1',
                [color, font_family, font_size, font_color, line_height, text_align, text_color]
            );
        } else {
            await pool.query(
                'INSERT INTO body_settings (color, font_family, font_size, font_color, line_height, text_align, text_color) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [color, font_family, font_size, font_color, line_height, text_align, text_color]
            );
        }

        res.status(200).json({ message: 'Body settings updated successfully', body_settings: req.body });
    } catch (error) {
        console.error('Error updating body settings:', error);
        res.status(500).send('Error updating body settings');
    }
});

export default router;