const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    id:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    quantity:{
        type:String,
        required:false
    },
    cost:{
        type:String,
        required:false
    }
});
module.exports = mongoose.model("Product_Lap", productSchema);