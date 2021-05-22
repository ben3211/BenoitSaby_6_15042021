const express = require ('express');
const router = express.Router ();
const userCtrl = require ('../controllers/user');
const authLimiter = require ('../middleware/authLimiter')

const passwordVerification = require ('../middleware/passwordVerification');
const emailValidator = require ('../middleware/emailValidator');

// Creation signup et login and security middleware
router.post('/signup', emailValidator, passwordVerification, userCtrl.signup);
router.post('/login', authLimiter, userCtrl.login);

// On exporte le router
module.exports = router;