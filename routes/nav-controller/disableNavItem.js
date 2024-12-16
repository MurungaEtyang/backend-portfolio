import { Router } from "express";
import pool from "../../database/config.js";
const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav/items/{id}/disable:
 *   patch:
 *     summary: Disable a navigation item
 *     tags:
 *       - Navigation Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the navigation item to disable
 *     responses:
 *       200:
 *         description: Navigation item disabled successfully
 *       404:
 *         description: Navigation item not found
 *       500:
 *         description: Server error
 */

router.patch('/items/:id/disable', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'UPDATE navigation_items SET status = ? WHERE id = ?',
            ['disabled', id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Navigation item not found.');
        }

        res.send('Navigation item disabled successfully.');
    } catch (error) {
        res.status(500).send('Error disabling navigation item.');
    }
});

export default router;
