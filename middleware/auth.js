// récupération jsonwebtoken pour vérifier les token
const jwt = require('jsonwebtoken');

// On exporte le middleware
module.exports = (req, res, next) => {
  try { 
    // Récupération du token, const token retourne un tableau avec 'Bearer' en 1er élément et le token en 2eme, on selectionne le 2eme avec [1]
    const token = req.headers.authorization.split(' ')[1];
    // Décodé le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // DecodedToken devient un object JS, on séléctionne l'userId
    const userId = decodedToken.userId;
    // Si useId il y a, vérifier qu'elle correqspond bien au token 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      // Si tout va bien next (), car ce middleware sera appliqué avant le controlleur de nos routes, donc pour chaque requête on passe par ce middleware
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};