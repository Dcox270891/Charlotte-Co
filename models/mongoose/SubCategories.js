const mongoose = require("mongoose");
const Categories = require("./Categories");

const Schema = mongoose.Schema;

const SubCategoriesSchema = new Schema({
    belongsTo: [{ 
        type: Schema.Types.ObjectId,
        ref: Categories 
    }],
    title:{
        type: String,
        required: true,
    },
    categoryId:{
        type: Number,
        required: true
    },
    subCategoriesId:{
        type: Number,
        required: true
    },
});

const SubCategories = mongoose.model("SubCategories", SubCategoriesSchema);

module.exports = SubCategories;