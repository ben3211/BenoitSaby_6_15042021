const Sauces = require ('../models/Sauces');


exports.creatSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.thing);
    // On suprime l'ID car il serra généré par mangoDB
    delete sauceObject._id;             
    const thing = new Thing ({
        // Copie les champs du corps de la requête 
        ...sauceObject,                   
        // Nous devons résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename . Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ). Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ). Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`              
    });
    thing.save ()                       
        // la méthode save enregistre l'objet dans la base et retourne une promesse
        .then (() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch (error => res.status(400).json({ error }));
};

exports.modifySauces = (req, res, next) => {
    // Permet de mettre à jour la sauce qui correspond à l'objet que nous passons comme premier argument
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })    
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteSauces = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSauces = (req, res, next) => {
    // Trouver la Sauces unique ayant le même _id que le paramètre de la requête
    Sauces.findOne({ _id: req.params.id })                 
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.getAllSauces = (req, res, next) => {
    //  Renvoyer un tableau contenant tous les Sauces
    Sauces.find()                    
        .then(sauces => res.status (200).json (sauces))
        .catch(error => res.status (400).json ({ error }));
}