const mongoose=require("mongoose");
const salesScheme=mongoose.Schema({
    Time:{
        type:String,
        required:false
    },
    Amount:{
        type:String,
        required:false
    }
});

const Sales = mongoose.model('sales', salesScheme);
module.exports = Sales;