const mongoose=require("mongoose");
const addressSchema = new mongoose.Schema({
    authToken: {
      type: String,
      required: false,
    },
    userAddress: [
      {
        firstName:{
            type:String,
            required:false
        },
        lastName:{
            type:String,
            required:false
        },
        address:{
            type:String,
            required:false
        },
        city:{
            type:String,
            required:false
        },
        state:{
            type:String,
            required:false
        },
        zip:{
            type:String,
            required:false
        },
        country:{
            type:String,
            required:false
        }
      },
    ],
  });

const Address = mongoose.model('userAddress', addressSchema);
module.exports = Address;