const cloudinary = require('cloudinary').v2;
const db = require("../../models/mongoose/index");
require(`dotenv`).config();

cloudinary.config({ 
    cloud_name: process.env.cloudName, 
    api_key: process.env.clodinaryKey, 
    api_secret: process.env.coudinarySecret,
});

module.exports ={
    getAllImages: function(req, res){
        db.Images
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findImageById: function(req, res) {
        db.Images
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    postImage: function(req, res) {  
        cloudinary.uploader.upload(req.fileToUpload.files.image.path, function(result, err) {
            console.log(results, err)
            db.Images
                .create({...req.body, 
                    url: result.url,
                    imageId : result.public_id,
                })
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
        })
    },
    deleteImageById: function(req, res) {
      db.Images
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
	},
    findImagesByProduct: function(req, res) {
        db.Images
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    deleteImagesByProduct: function(req, res) {
      db.Images
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
	},
    findImagesByTransfer: function(req, res) {
        db.Images
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    deleteImageByTransfer: function(req, res) {
      db.Images
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
	},
}