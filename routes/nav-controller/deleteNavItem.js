import { Router } from "express";
import pool from "../../database/config.js";
const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav/items/{id}:
 *   delete:
 *     summary: Delete a navigation item
 *     tags:
 *       - Navigation Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the navigation item to delete
 *     responses:
 *       200:
 *         description: Navigation item deleted successfully
 *       404:
 *         description: Navigation item not found
 *       500:
 *         description: Server error
 */
router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM navigation_items WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Navigation item not found.');
        }

        res.send('Navigation item deleted successfully.');
    } catch (error) {
        res.status(500).send('Error deleting navigation item.');
    }
});

export default router;
