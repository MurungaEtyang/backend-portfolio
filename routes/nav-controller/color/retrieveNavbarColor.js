import { Router } from 'express';
import pool from "../../../database/config.js";

const router = Router();

/**
 * @swagger
 * /api/kenf/management/navbar-setting/retrieve-settings:
 *   get:
 *     summary: Retrieve all navbar settings
 *     description: Fetches all navbar settings including color, alignment, visibility, and other configurations.
 *     tags:
 *        - navbar-setting
 *     responses:
 *       200:
 *         description: The current navbar settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 settings:
 *                   type: object
 *                   description: The navbar settings object
 *                   properties:
 *                     color:
 *                       type: string
 *                       description: The background color of the navbar
 *                       example: '#ffffff'
 *                     text_color:
 *                       type: string
 *                       description: The text color of the navbar
 *                       example: '#000000'
 *                     font_size:
 *                       type: string
 *                       description: Font size of the navbar text
 *                       example: '16px'
 *                     font_family:
 *                       type: string
 *                       description: Font family of the navbar text
 *                       example: 'Arial, sans-serif'
 *                     border_color:
 *                       type: string
 *                       description: The border color of the navbar
 *                       example: '#cccccc'
 *                     border_radius:
 *                       type: string
 *                       description: The border radius of the navbar
 *                       example: '10px'
 *                     hover_color:
 *                       type: string
 *                       description: The hover background color of the navbar
 *                       example: '#f0f0f0'
 *                     hover_text_color:
 *                       type: string
 *                       description: The hover text color of the navbar
 *                       example: '#ffffff'
 *                     shadow:
 *                       type: string
 *                       description: Box shadow of the navbar
 *                       example: '0px 4px 10px gray'
 *                     alignment:
 *                       type: string
 *                       enum: [left, center, right]
 *                       description: The alignment of navbar items
 *                       example: 'center'
 *                     visibility:
 *                       type: boolean
 *                       description: Whether the navbar is visible
 *                       example: true
 *       500:
 *         description: Error fetching navbar settings
 */
router.get('/retrieve-settings', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM navbar_settings LIMIT 1');
        if (rows.length > 0) {
            res.status(200).json({ settings: rows[0] });
        } else {
            res.status(200).json({
                settings: {
                    color: '#ffffff',
                    text_color: '#000000',
                    font_size: '16px',
                    font_family: 'Arial, sans-serif',
                    border_color: '#cccccc',
                    border_radius: '0px',
                    hover_color: null,
                    hover_text_color: null,
                    shadow: null,
                    alignment: 'left',
                    visibility: true,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching navbar settings');
    }
});

export default router;
