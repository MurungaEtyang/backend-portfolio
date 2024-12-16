import { Router } from 'express';
import pool from '../../database/config.js';

const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav/activate-all:
 *   put:
 *     summary: Activate All Disabled Navigation Items
 *     description: This endpoint activates all navigation items that are currently disabled.
 *     tags:
 *       - Navigation Items
 *     responses:
 *       200:
 *         description: Successfully activated the navigation items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '3 navigation item(s) activated.'
 *       404:
 *         description: No disabled navigation items found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'No disabled navigation items found.'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'An error occurred while activating navigation items.'
 */
router.put('/activate-all', async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE navigation_items SET status = "active" WHERE status = "disabled"'
        );

        if (result.affectedRows > 0) {
            res.status(200).send({ message: `${result.affectedRows} navigation item(s) activated.` });
        } else {
            res.status(404).send({ message: 'No disabled navigation items found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while activating navigation items.' });
    }
});

export default router;
