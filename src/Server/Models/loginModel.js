const mongoose=require("mongoose");
const loginSchema=mongoose.Schema({
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    token:{
        type:String,
        default:""
    }
});
module.exports = mongoose.model("login_Details", loginSchema);