import { Router } from "express";
import pool from "../../database/config.js";
import generatePages from "../../utils/auto-page-generator/generatePages.js";
// import generatePages from "./auto-page-generator/generatePages.js";
const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav/active-items:
 *   get:
 *     summary: Get all active navigation items
 *     tags:
 *       - Navigation Items
 *     responses:
 *       200:
 *         description: List of active navigation items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Home
 *                   url:
 *                     type: string
 *                     example: /home
 *                   status:
 *                     type: string
 *                     example: active
 *       500:
 *         description: Server error
 */
router.get('/active-items', async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM navigation_items WHERE status = ?',
            ['active']
        );
        try {
            generatePages(rows);
        } catch (error) {
            console.error('Error generating pages:', error);
            return res.status(500).send('Error generating pages.');
        }


        res.json(rows);
    } catch (error) {
        res.status(500).send('Error retrieving navigation items.');
    }
});

export default router;
