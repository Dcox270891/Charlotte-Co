const mongoose = require("mongoose");
const Product = require("./Products");
const UniqueTransfers = require("./UniqueTransfers");


const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
    },
    imageId:{
        type: String,
        required: true,
    },
    forProduct: [{
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: false, 
    }],
    forTransfer: [{
        type: Schema.Types.ObjectId,
        ref: 'UniqueTransfers',
        required: false,  
    }]
});

const Images = mongoose.model("Images", ImagesSchema);

module.exports = Images;