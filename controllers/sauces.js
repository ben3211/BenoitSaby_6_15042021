const Sauces = require ('../models/Sauces');
// Package 'file systeme' help to delete files
const fs = require ('fs');

exports.creatSauces = (req, res, next) => {
    try {
    const sauceObject = JSON.parse(req.body.sauce);
    // ID creat by mangoDB
    delete sauceObject._id;           
    const sauces = new Sauces ({
        ...sauceObject,                   
        // rewrite the image url 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []              
    });
    sauces.save ()   
        .then (() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch (error => res.status(400).json({ error: 'ici' }));
    } catch {
        res.status(400).json({ error: 'Le nom de cette sauce existe déjà!'})
    } 
};

exports.modifySauces = (req, res, next) => {
    let saucesObject = {};
    req.file ? (
        // If the modification have an image
        Sauces.findOne({ _id: req.params.id }).then((sauces) => {
            // Delete old image
            const filename = sauces.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`)
        }),
        saucesObject = {
            // Modify data and add new image
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${ req.file.filename }`,
            // If modification doesn't contain new image
        }) : ( saucesObject = { ...req.body } )
        // Apply sauceObject parameters 
    Sauces.updateOne({ _id: req.params.id }, { ...saucesObject,  _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
      .catch((error) => res.status(400).json({error: 'Le nom de cette sauce existe déjà!'}))
};


exports.likeSauces = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;

    Sauces.findOne({ _id: req.params.id }) 
        .then(sauce => {
            let statusMessage = "";
            switch (req.body.like) {
            case 1:
                if (!sauce.usersLiked.includes(req.body.userId)) {  // If he has not yet like the sauce
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
                if (!sauce.usersDisliked.includes(req.body.userId)) {  // If he has not yet dislike the sauce
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
    // Delete image from the server
    Sauces.findOne ({ _id: req.params.id })
        // Extract the name of the file to delete 
        .then(sauces => {
            const filename = sauces.imageUrl.split('/images/')[1];
            // Delete it 
            fs.unlink(`images/${filename}`, () => {
                // Delete object from the database 
                Sauces.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch (error => res.status (500).json ({ error }));
};

exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })                 
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauces.find()                    
        .then(sauces => res.status (200).json (sauces))
        .catch(error => res.status (400).json ({ error }));
};