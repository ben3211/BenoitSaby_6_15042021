const multer = require ('multer');

// Constante dictionnaire pour résoudre l'extension de fichier appropriée
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

// Création objet de configuration pour multer
//DdiskStorage pour l'enregistraer sur le disk
const storage = multer.diskStorage ({
    // L'objet passer a diskStorage à besoin de deux éléments, destination et filename
    destination: (req, file, callback) => {
        // Callback null pour dire qu'il n'y a pas eu d'erreure
        callback (null, 'images')
    },
    // Explique qu'elle nom de fichier utiliser 
    filename: (req, file, callback) => {
        // Prend le nom original et remplace par un underscore les espace si il y en à
        const name = file.originalname.split(' ').join('_');
        // Appliquer une extension au fichier corespondant au MINE_TYPE du fichier front 
        const extension = MIME_TYPES[file.mimetype];
        callback (null, name + Date.now() + '.' + extension);
        // Appel du callback, et création du filename + Date.now ajoute un time stump + l'ectension 
    }
});

// Export fichier unique et se seront des images
module.exports = multer ({ storage }).single('image');