const express = require ('express');
const router = express.Router ();


// Importation middleware 
const auth = require ('../middleware/auth');
const saucesCtrl = require ('../controllers/sauces');
const multer = require ('../middleware/multer-config')


// Traitement des requêtes postes 
// On remplace /api/stuff par un slash car c'est la route de base tout le temps la même.
// 'Auth' pour le route que l'on souhaite proteger 
// Penser à ne pas placer le traitmeent des images (multer) avant l'auth
// Route POST
router.post ('/', auth, multer, saucesCtrl.creatSauces);

// Route PUT / modifier
router.put('/:id', auth, saucesCtrl.modifySauces);

// Route DELETE
router.delete('/:id', auth, saucesCtrl.deleteSauces);

// Route GET, :id dit à expresse que cette partie de la route est dinamique
router.get('/:id', auth, saucesCtrl.getOneSauces);

// Route GET, le premier argument est l'éxtension de l'URL visé par l'application (appellé: route/end point)
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;