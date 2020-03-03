const mongoose = require("mongoose");
const Categories = require("./Categories");
const SubCategories = require("./SubCategories");


const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true, 
    },
    productId:{
        type: Number,
        unique: true,
        required: true,
    },
    description:{
        type: String,
        required: true, 
    },
    category:[{
        type: Schema.Types.ObjectId,
        ref: Categories,
        required: true,   
    }],
    subcategory:[{
        type: Schema.Types.ObjectId,
        ref: SubCategories,
        required: true,   
    }],
    price:{
        type: Number,
        required: true, 
    },
    sizes:{
        type: [],
        required: false, 
    },
    productColours:{
        type: [],
        required: false, 
    },
    personalisableImage:{
        type: String,
        required: false, 
    },
    isActive:{
        type: Boolean,
        default: true, 
    },
    inStock:{
        type: Boolean,
        default: false, 
    },
    deliveryTimeMax:{
        type: Number,
        required: true, 
    },
    deliveryTimeMin:{
        type: Number,
        required: true, 
    },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;