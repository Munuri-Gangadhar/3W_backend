const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { protectAdmin };
