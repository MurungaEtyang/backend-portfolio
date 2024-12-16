import { Router } from 'express';
import pool from '../../database/config.js';
const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav/activate/{id}:
 *   put:
 *     summary: Activate a Specific Disabled Navigation Item
 *     description: This endpoint activates a specific navigation item based on the provided `id`.
 *     tags:
 *       - Navigation Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the navigation item to activate.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully activated the navigation item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Navigation item with ID 1 activated.'
 *       404:
 *         description: Navigation item not found or already active.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Navigation item with ID 1 not found or already active.'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'An error occurred while activating the navigation item.'
 */
router.put('/activate/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'UPDATE navigation_items SET status = "active" WHERE id = ? AND status = "disabled"',
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).send({ message: `Navigation item with ID ${id} activated.` });
        } else {
            res.status(404).send({ message: `Navigation item with ID ${id} not found or already active.` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while activating the navigation item.' });
    }
});

export default router;
