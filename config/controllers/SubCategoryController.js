const db = require("../../models/mongoose/index");

module.exports ={
    findAllSubCategories: function(req, res){
        db.SubCategories
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findSubCategoryById: function(req, res) {
        db.SubCategories
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findSubCategoryByCategory: function(req, res) {
        db.SubCategories
            .find({
              belongsTo: req.params.id
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createSubCategory: function(req, res) {
      db.SubCategories
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    updateSubCategory: function(req, res) {
      db.SubCategories
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    removeSubCategory: function(req, res) {
      db.SubCategories
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
}