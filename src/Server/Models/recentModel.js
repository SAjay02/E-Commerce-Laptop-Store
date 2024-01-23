const mongoose=require("mongoose");
const recentScheme=mongoose.Schema({
    Name: {
        type: String,
        required: false,
      },
    City:{
        type:String,
        required:false
    },
    State:{
        type:String,
        required:false
    },
    Payment:{
        type:String,
        required:false
    },
    LastDigits:{
        type:String,
        required:false
    },
    Amount:{
        type:String,
        required:false
    },
    Date:{
        type:String,
        required:false
    }
});

const Recent = mongoose.model('recentOrders', recentScheme);
module.exports = Recent;