import { Router } from "express";
import pool from "../../../database/config.js";

const router = Router();

/**
 * @swagger
 * /api/kenf/management/navbar-setting/update-settings:
 *   post:
 *     summary: Update navbar settings
 *     description: Updates various navbar settings such as color, font, alignment, and visibility.
 *     tags:
 *         - navbar-setting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nav_bg_color:
 *                 type: string
 *                 description: Navbar background color in hex format.
 *                 example: '#ff5733'
 *               text_color:
 *                 type: string
 *                 description: Navbar text color in hex format.
 *                 example: '#000000'
 *               font_size:
 *                 type: string
 *                 description: Font size (e.g., 16px, 1.5em).
 *                 example: '16px'
 *               font_family:
 *                 type: string
 *                 description: Font family (e.g., Arial, sans-serif).
 *                 example: 'Arial, sans-serif'
 *               border_color:
 *                 type: string
 *                 description: Border color in hex format.
 *                 example: '#cccccc'
 *               border_radius:
 *                 type: string
 *                 description: Border radius (e.g., 5px, 10px).
 *                 example: '10px'
 *               hover_color:
 *                 type: string
 *                 description: Background color on hover in hex format.
 *                 example: '#f0f0f0'
 *               hover_text_color:
 *                 type: string
 *                 description: Text color on hover in hex format.
 *                 example: '#ffffff'
 *               shadow:
 *                 type: string
 *                 description: Box shadow (e.g., 0px 4px 10px gray).
 *                 example: '0px 4px 10px gray'
 *               alignment:
 *                 type: string
 *                 enum: [left, center, right]
 *                 description: Text alignment.
 *                 example: 'center'
 *               visibility:
 *                 type: boolean
 *                 description: Whether the navbar is visible.
 *                 example: true
 *     responses:
 *       200:
 *         description: Navbar settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Navbar settings updated successfully'
 *                 settings:
 *                   type: object
 *                   description: The updated settings.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */
router.post('/update-settings', async (req, res) => {
    const {
        nav_bg_color,
        text_color,
        font_size,
        font_family,
        border_color,
        border_radius,
        hover_color,
        hover_text_color,
        shadow,
        alignment,
        visibility,
    } = req.body;

    const hexPattern = /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/;
    if (
        (nav_bg_color && !hexPattern.test(nav_bg_color)) ||
        (text_color && !hexPattern.test(text_color)) ||
        (border_color && !hexPattern.test(border_color)) ||
        (hover_color && !hexPattern.test(hover_color)) ||
        (hover_text_color && !hexPattern.test(hover_text_color))
    ) {
        return res.status(400).send('Invalid hex color format.');
    }
    if (font_size && !/^\d+(px|em|rem|%)$/.test(font_size)) {
        return res.status(400).send('Invalid font size format.');
    }
    if (alignment && !['left', 'center', 'right'].includes(alignment)) {
        return res.status(400).send('Invalid alignment value.');
    }
    if (visibility !== undefined && typeof visibility !== 'boolean') {
        return res.status(400).send('Visibility must be a boolean.');
    }

    try {
        const [existingSettings] = await pool.query('SELECT * FROM navbar_settings LIMIT 1');
        const queryValues = {
            nav_bg_color,
            text_color,
            font_size,
            font_family,
            border_color,
            border_radius,
            hover_color,
            hover_text_color,
            shadow,
            alignment,
            visibility,
        };

        if (existingSettings.length > 0) {
            const updateFields = Object.entries(queryValues)
                .filter(([_, value]) => value !== undefined)
                .map(([key]) => `${key} = ?`)
                .join(', ');

            const updateValues = Object.values(queryValues).filter((value) => value !== undefined);
            await pool.query(
                `UPDATE navbar_settings SET ${updateFields}, updated_at = CURRENT_TIMESTAMP WHERE id = 1`,
                updateValues
            );
        } else {
            const fields = Object.keys(queryValues).filter((key) => queryValues[key] !== undefined);
            const placeholders = fields.map(() => '?').join(', ');
            const insertValues = fields.map((field) => queryValues[field]);

            await pool.query(
                `INSERT INTO navbar_settings (${fields.join(', ')}) VALUES (${placeholders})`,
                insertValues
            );
        }

        res.status(200).json({
            message: 'Navbar settings updated successfully',
            settings: queryValues,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating navbar settings');
    }
});

export default router;
