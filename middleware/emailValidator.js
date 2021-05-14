const emailValidator = require ('email-validator');

module.exports = (req, res, next) => {
    if (!emailValidator.validate(req.body.email)) {
        return res.status (400).json ({ error : 'email non valide' });
    } else {
        next ();
    }
};