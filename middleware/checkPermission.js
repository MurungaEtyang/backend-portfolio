
import pool from '../database/config.js';

/**
 * Middleware to check if the user has the required permission
 * @param {string} permissionName - The permission to check (e.g., 'create_tenant')
 * @returns {function} - Express middleware function
 */
const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        const userId = req.user.userId;

        const query = `
            SELECT p.permission_name
            FROM permissions p
            JOIN role_permissions rp ON p.id = rp.permission_id
            JOIN roles r ON rp.role_id = r.id
            JOIN user_roles ur ON ur.role_id = r.id
            WHERE ur.user_id = ? AND p.permission_name = ?
        `;

        try {
            const [result] = await pool.query(query, [userId, permissionName]);

            if (result.length === 0) {
                return res.status(403).json({
                    status: 403,
                    message: 'You do not have the required permission to perform this action',
                });
            }

            next();
        } catch (error) {
            console.error('Error checking permission:', error);
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong while checking permissions',
            });
        }
    };
};

export default checkPermission;
