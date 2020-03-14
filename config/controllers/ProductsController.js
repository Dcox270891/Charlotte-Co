const db = require("../../models/mongoose/index");

module.exports ={ 
    findAllProducts: function(req, res){
        db.Products
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findProductById: function(req, res) {
        db.Products
            .find({_id: req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createProduct: function(req, res) {
      db.Products
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    updateProduct: function(req, res) {
      db.Products
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    removeProducts: function(req, res) {
      db.Products
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    getProductBySubCategory: function(req, res) {
        db.Products
        .find({
          subCategory: req.params.id
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

}