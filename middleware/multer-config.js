const multer = require ('multer');

// Dictionary constant to resolve the appropriate file extension 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

// Multer configuration
const storage = multer.diskStorage ({
    destination: (req, file, callback) => {
        // null = no error
        callback (null, 'images')
    },
    // files name ? 
    filename: (req, file, callback) => {
        // Underscor instead of spaces 
        const name = file.originalname.split(' ').join('_');
        // Apply an extension 
        const extension = MIME_TYPES[file.mimetype];
        // Callback and file name creation
        callback (null, name + Date.now() + '.' + extension);
    }
});

// Single file export
module.exports = multer ({ storage }).single('image');