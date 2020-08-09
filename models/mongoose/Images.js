const mongoose = require("mongoose");
const Product = require("./Products");
const UniqueTransfers = require("./UniqueTransfers");


const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    img:{
        data: Buffer,
        contentType: String,
    },
    for: [{
        type: Schema.Types.ObjectId,
        ref: Product || UniqueTransfers,
        required: false, 
    }],
});

const Images = mongoose.model("Images", ImagesSchema);

module.exports = Images;