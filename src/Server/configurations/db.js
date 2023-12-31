const mongoose=require("mongoose");
const connectdb=async()=>
{
    try {
    const connection = await mongoose.connect("mongodb://0.0.0.0:27017/userDetails", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected:", connection.connection.host, connection.connection.name);
    return connection;
  } catch (err) {
    console.log(err);
  }
}
module.exports=connectdb;