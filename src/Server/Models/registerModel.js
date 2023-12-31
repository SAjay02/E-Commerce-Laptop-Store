const mongoose=require("mongoose");
const registerSchema=mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false,
        unique:true
    },
    password:{
        type:String,
        required:false
    },
    confirm_password:{
        type:String,
        required:false
    },
    token:
    {
        type:String,
        default:""
    }
});
module.exports = mongoose.model("Register_Details", registerSchema);