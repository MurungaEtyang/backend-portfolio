import jwt from 'jsonwebtoken';

const authenticate = (role) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization']?.replace('Bearer ', '');
            if (!token) return res.status(401).json({ message: 'Authentication token is missing' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
};


export default authenticate;
