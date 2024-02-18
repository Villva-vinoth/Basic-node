const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide the name"],
    },
    quantity:{
        type:Number,
        required:true,
        default:0,
    },
    image:{
        type:String,
        required:false,
    },
    productDescription:{
        type:String,
        require:false
    },
    productDemo:{
        type:String,
        require:false
    },
},
{
    timestamps:true
}
)

const productModel = mongoose.model('product',productSchema);

module.exports ={
    productModel
}