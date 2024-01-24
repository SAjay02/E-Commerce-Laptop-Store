const mongoose=require("mongoose");
const revenueScheme=mongoose.Schema({
    Amount:{
        type:String,
        required:false
    }
});

const Revenue = mongoose.model('totalrevenue', revenueScheme);
module.exports = Revenue;