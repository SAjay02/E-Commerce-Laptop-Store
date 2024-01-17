const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    authToken: {
        type: String,
        required: false,
      },
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

const Buy = mongoose.model('buyproduct', productSchema);
module.exports = Buy;