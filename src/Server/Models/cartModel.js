const mongoose=require("mongoose");
const cartSchema = new mongoose.Schema({
    authToken: {
      type: String,
      required: false,
    },
    products: [
      {
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
      },
    ],
  });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;