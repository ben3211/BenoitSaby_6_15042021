const Sauces = require ('../models/Sauces');
// Package 'file systeme'  Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers
const fs = require ('fs');

exports.creatSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // On suprime l'ID car il serra généré par mangoDB
    delete sauceObject._id;             
    const sauces = new Sauces ({
        // Copie les champs du corps de la requête 
        ...sauceObject,                   
        // Nous devons résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename . Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ). Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ). Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []              
    });
    sauces.save ()                       
        // la méthode save enregistre l'objet dans la base et retourne une promesse
        .then (() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch (error => res.status(400).json({ error }));
};

exports.modifySauces = (req, res, next) => {
    let saucesObject = {};
    req.file ? (
      // Si la modification contient une image => Utilisation de l'opérateur ternaire comme structure conditionnelle.
      Sauces.findOne({ _id: req.params.id }).then((sauces) => {
        // On supprime l'ancienne image du serveur
        const filename = sauces.imageUrl.split('/images/')[1]
        fs.unlinkSync(`images/${filename}`)
      }),
      saucesObject = {
        // On modifie les données et on ajoute la nouvelle image
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${ req.file.filename }`,
        // Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
        // Si la modification ne contient pas de nouvelle image
      }) : ( saucesObject = { ...req.body } )
        // On applique les paramètre de sauceObject
    Sauces.updateOne({ _id: req.params.id }, { ...saucesObject,  _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
      .catch((error) => res.status(400).json({ error }))
};


exports.likeSauces = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;

    Sauces.findOne({ _id: req.params.id }) 
        .then(sauce => {
            let statusMessage = "";
            // On met en place son nouveau vote
            switch (req.body.like) {
            case 1:
                if (!sauce.usersLiked.includes(req.body.userId)) {  // s'il n'a pas encore liké la sauce 
                    Sauces.updateOne({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: req.body.userId}, _id: req.params.id})
                    .then(() => res.status(201).json({message : "like ajouter !" }))
                    .catch(error => res.status(400).json({error}));
                } else {
                    Sauces.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}, _id: req.params.id})
                    .then(() => res.status(201).json({message : "like retirer !" }))
                    .catch(error => res.status(400).json({error}));
                }
                statusMessage = "Sauce likée !";
                break;
            case 0:
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauces.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}, _id: req.params.id})
                    .then(() => res.status(201).json({message : "like retirer !" }))
                    .catch(error => res.status(400).json({error}));
                }
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauces.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}, _id: req.params.id})
                    .then(() => res.status(201).json({message : "dislike retirer !" }))
                    .catch(error => res.status(400).json({error}));
                }
                statusMessage = "Sauce ignorée !";
                break;
            case -1:
                if (!sauce.usersDisliked.includes(req.body.userId)) {  // s'il n'a pas encore disliké la sauce
                    Sauces.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: req.body.userId}, _id: req.params.id})
                    .then(() => res.status(201).json({message : "dislikes  ajouter !" }))
                    .catch(error => res.status(400).json({error}));
                } else {
                    Sauces.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}, _id: req.params.id})
                    .then(() => res.status(201).json({message : "dislike retirer !" }))
                    .catch(error => res.status(400).json({error}));
                }
                statusMessage = "Sauce dislikée !";     
                break;
            }
            res.status(200).json( {message: statusMessage} )
        })
        .catch (( error ) => {
            res.status (400).json ({ error }); 
        });
};


exports.deleteSauces = (req, res, next) => {
    // Quand un utilisateur suprime une image, celle-ci doit égalment être supprimée du serveur
    Sauces.findOne ({ _id: req.params.id })
        // On extrait le nom du fichier à suprimer 
        .then(sauces => {
            const filename = sauces.imageUrl.split('/images/')[1];
            // On le supprime
            fs.unlink(`images/${filename}`, () => {
                // Ensuite on supprime l'object de la base
                Sauces.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch (error => res.status (500).json ({ error }));
};

exports.getOneSauces = (req, res, next) => {
    // Trouver la Sauces unique ayant le même _id que le paramètre de la requête
    Sauces.findOne({ _id: req.params.id })                 
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    //  Renvoyer un tableau contenant tous les Sauces
    Sauces.find()                    
        .then(sauces => res.status (200).json (sauces))
        .catch(error => res.status (400).json ({ error }));
};