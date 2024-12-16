import { Router } from "express";
import pool from "../../database/config.js";
const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav/items/all:
 *   get:
 *     summary: Get all even disabled navigation items
 *     tags:
 *       - Navigation Items
 *     responses:
 *       200:
 *         description: List of even disabled navigation items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   name:
 *                     type: string
 *                     example: About
 *                   url:
 *                     type: string
 *                     example: /about
 *                   status:
 *                     type: string
 *                     example: disabled
 *       500:
 *         description: Server error
 */
router.get('/items/all', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM navigation_items WHERE status = ? AND id % 2 = 0',
            ['disabled']
        );

        res.json(rows);
    } catch (error) {
        res.status(500).send('Error retrieving even disabled navigation items.');
    }
});

export default router;
