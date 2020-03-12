const mongoose = require("mongoose");
const Product = require("./Products");

const Schema = mongoose.Schema;

const UniqueTransfersSchema = new Schema({
    forProduct: [{
        type: Schema.Types.ObjectId,
        ref: 'Products' 
    }],
    title:{
        type: String,
        required: true, 
    },
    transferDescription:{
        type: String,
        required: true, 
    },
    transferImages:{
        type: [],
        required: false, 
    },
    mainTranferImage:{
        type: String,
        required: false, 
    },
    priceDifference:{
        type: Number,
        required: false, 
    },
});

const UniqueTransfers = mongoose.model("UniqueTransfers", UniqueTransfersSchema);

module.exports = UniqueTransfers;