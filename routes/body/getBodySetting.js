import { Router } from "express";
import pool from "../../database/config.js";

const router = Router();

/**
 * @swagger
 * /api/kenf/management/body-setting/retrieve-body-settings:
 *   get:
 *     summary: Get the current body styling (background color, font, etc.)
 *     description: Fetches the current body settings such as background color, font family, font size, etc.
 *     tags:
 *         - body settings
 *     responses:
 *       200:
 *         description: The current body settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 color:
 *                   type: string
 *                   example: '#ffffff'
 *                 font_family:
 *                   type: string
 *                   example: 'Arial'
 *                 font_size:
 *                   type: string
 *                   example: '16px'
 *                 font_color:
 *                   type: string
 *                   example: '#000000'
 *                 line_height:
 *                   type: string
 *                   example: '1.5'
 *                 text_align:
 *                   type: string
 *                   example: 'left'
 *                 text_color:
 *                   type: string
 *                   description: The color of the body text
 *       500:
 *         description: Error fetching body settings
 */


router.get('/retrieve-body-settings', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM body_settings LIMIT 1');
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(200).json({
                color: '#ffffff',
                font_family: 'Arial',
                font_size: '16px',
                font_color: '#000000',
                line_height: '1.5',
                text_align: 'left',
                text_color: '#000000',
            });
        }
    } catch (error) {
        console.error('Error fetching body settings:', error);
        res.status(500).send('Error fetching body settings');
    }
});

export default router;