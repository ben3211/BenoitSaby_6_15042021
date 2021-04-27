const express = require ('express');
const router = express.Router ();

const saucesCtrl = require ('../controllers/sauces');


// Traitement des requêtes postes 
// On remplace /api/stuff par un slash car c'est la route de base tout le temps la même.
// Route POST
router.post ('/', saucesCtrl.creatSauces);

// Route PUT / modifier
router.put('/:id',saucesCtrl.modifySauces);

// Route DELETE
router.delete('/:id',saucesCtrl.deleteSauces);

// Route GET, :id dit à expresse que cette partie de la route est dinamique
router.get('/:id',saucesCtrl.getOneSauces);

// Route GET, le premier argument est l'éxtension de l'URL visé par l'application (appellé: route/end point)
router.get('/',saucesCtrl.getAllSauces);

module.exports = router;