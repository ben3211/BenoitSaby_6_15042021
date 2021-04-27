const Sauces = require ('../models/Sauces');


exports.creatSauces = (req, res, next) => {
    delete req.body._id;            // On suprime l'ID car il serra généré par mangoDB
    const sauces = new Sauces ({
      ...req.body                   // Copie les champs du corps de la requête 
    });
    sauces.save ()                   // la méthode save enregistre l'objet dans la base et retourne une promesse
      .then (() => res.status(201).json({message: 'Objet enregistré !'}))
      .catch (error => res.status(400).json({ error }));
};

exports.modifySauces = (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })    // Permet de mettre à jour la sauce qui correspond à l'objet que nous passons comme premier argument
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteSauces = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })                 // Trouver la Sauces unique ayant le même _id que le paramètre de la requête
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.getAllSauces = (req, res, next) => {
    Sauces.find()                    //  Renvoyer un tableau contenant tous les Sauces
        .then(sauces => res.status (200).json (sauces))
        .catch(error => res.status (400).json ({ error }));
}