const mongoose = require("mongoose");
const Product = require("./ProductSchema");

const Schema = mongoose.Schema;

const UniqueTransfersSchema = new Schema({
    forProduct: [{
        type: Schema.Types.ObjectId,
        ref: 'Products' 
    }],
    productId:{
        type: Number,
        required: true,
        unique: true,
    },
    transferId:{
        type: Number,
        required: true, 
    },
    title:{
        type: String,
        required: true, 
    },
    transferDescription:{
        type: String,
        required: true, 
    },
    tranferImages:{
        type: [],
        required: true, 
    },
    mainTranferImages:{
        type: String,
        required: true, 
    },
    priceDifference:{
        type: Number,
        required: false, 
    },
});

const UniqueTransfers = mongoose.model("UniqueTransfers", UniqueTransfersSchema);

module.exports = UniqueTransfers;