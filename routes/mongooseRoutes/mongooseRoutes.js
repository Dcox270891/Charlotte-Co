const Categories = require("../../models/mongoose/Categories");
const SubCategories = require("../../models/mongoose/SubCategories");
const Products = require("../../models/mongoose/Products");
const UniqueTransfers = require("../../models/mongoose/UniqueTransfers");

module.exports = function(app){

    app.post("/api/newproduct", ({ body }, res) => {
        Products.create(body)
            .then(newProduct => {
                console.log(`Added a new rPoduct: ${newProduct}`)
                res.json(newProduct);
            })
            .catch(err => {
                res.json(err);
            });
    });
    app.post("/api/newCategory", ({ body }, res) => {
        Categories.create(body)
            .then(newCategory => {
                console.log(`Added a new product: ${newCategory}`)
                res.json(newCategory);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/categories", (req, res) => {
        Categories.find({})
            .then(Categories => res.json(Categories))
            .catch(err => console.log(err))
    });

    app.post("/api/newSubCategories", ({ body }, res) => {
        SubCategories.create(body)
            .then(newSubCategories => {
                console.log(`Added a new product: ${newSubCategories}`)
                res.json(newSubCategories);
            })
            .catch(err => {
                res.json(err);
            });
    });
    app.post("/api/newUniqueTransfers", ({ body }, res) => {
        UniqueTransfers.create(body)
            .then(newUniqueTransfers => {
                console.log(`Added a new product: ${newUniqueTransfers}`)
                res.json(newUniqueTransfers);
            })
            .catch(err => {
                res.json(err);
            });
    });
};