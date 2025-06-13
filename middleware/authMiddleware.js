const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {

            // 2. Get token from header
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Attach user info to request (excluding password)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // ✅ move to next middleware or route handler
        } 
        catch (err) {
            console.error('Auth error:', err.message);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    // 5. No token
    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
};


module.exports = { protect };















     

   



