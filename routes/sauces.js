const express = require ('express');
const router = express.Router ();


// Middleware importation
const auth = require ('../middleware/auth');
const saucesCtrl = require ('../controllers/sauces');
const multer = require ('../middleware/multer-config')


// Requests processing
// POST
router.post ('/', auth, multer, saucesCtrl.creatSauces);
// PUT 
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
// DELETE
router.delete('/:id', auth, saucesCtrl.deleteSauces);
// GET
router.get('/:id', auth, saucesCtrl.getOneSauces);
// GET
router.get('/', auth, saucesCtrl.getAllSauces);
// Post
router.post('/:id/like', auth, saucesCtrl.likeSauces);

// Router exportation
module.exports = router;