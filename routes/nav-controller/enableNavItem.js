import { Router } from "express";
import pool from "../../database/config.js";
const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav/items:
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
router.get('/items', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM navigation_items WHERE status = ?',
            ['active']
        );

        res.json(rows);
    } catch (error) {
        res.status(500).send('Error retrieving navigation items.');
    }
});

export default router;
