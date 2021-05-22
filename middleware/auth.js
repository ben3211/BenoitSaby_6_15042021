// Jsonwebtoken => token verification
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try { 
    // Get token, const token return an array with 'Bearer' as 1st element and the token as second (we selectionne the second)
    const token = req.headers.authorization.split(' ')[1];
    // Decode token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // DecodedToken is an JS object, userId selection
    const userId = decodedToken.userId;
    // If there is a userId => check that it corresponds to the token 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};