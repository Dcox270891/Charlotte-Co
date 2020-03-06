const db = require("../../models/mongoose/index");

module.exports ={
    findAllUniqueTransfers: function(req, res){
        db.UniqueTransfers
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findUniqueTransferById: function(req, res) {
        db.UniqueTransfers
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createUniqueTransfer: function(req, res) {
      db.UniqueTransfers
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    updateUniqueTransfer: function(req, res) {
      db.UniqueTransfers
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    removeUniqueTransfer: function(req, res) {
      db.UniqueTransfers
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
}