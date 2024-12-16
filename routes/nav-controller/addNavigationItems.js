
import {Router} from "express";
import { addNavItem } from "../../services/navigationService.js";

const router = Router();


/**
 * @swagger
 * /api/kenf/management/nav/nav-items:
 *   post:
 *     summary: Add a new navigation item
 *     tags:
 *       - Navigation Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: About Us
 *                 description: The name of the navigation item
 *     responses:
 *       201:
 *         description: Navigation item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: About Us
 *                 url:
 *                   type: string
 *                   example: /about-us
 *       400:
 *         description: Name is required
 *       500:
 *         description: Server error
 */

router.post('/nav-items', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).send('Name is required.');

    try {
        const result = await addNavItem(name);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
