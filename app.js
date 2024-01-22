const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const Product=require("./src/Server/Models/productModel");
const Register=require("./src/Server/Models/registerModel");
const Login=require("./src/Server/Models/loginModel");
const Cart=require("./src/Server/Models/cartModel");
const Address=require("./src/Server/Models/addressModel");
const Buy=require("./src/Server/Models/buyModel"); 
const connectdb=require("./src/Server/configurations/db");
const app=express();
const PORT=process.env.PORT || 8000;
const jwt=require("jsonwebtoken");
const bcrypt =require("bcrypt")
const cookieParser=require("cookie-parser")
const router = express.Router();
const {v4:uuidv4}=require("uuid")
const stripe=require("stripe")("sk_test_51OWY6hSAa0gR3mOKzwpZGNdcKXGaIVoCWdG6o8OZo4jBatqSYdR6SvZ2cLJUzF9g3igQV1ZNZa29K9q1eD1HSwBr00U9i0xYQZ", { apiVersion: '2023-10-16' });

const nodeMailer = require('nodemailer');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())

//availble in db data's
const availableProducts = []

//connection 
connectdb();

//send data all products to db 
app.post("/",async(req,res)=>
{
    try{
        console.log('Received Data:',req.body);
        const newProduct = await new Login(req.body);
        const savedProduct=await  newProduct.save();
    res.status(201).json(savedProduct);
    }catch(error)
    {
        console.log("Error",error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}) 

 
//get data from db
app.get('/api/products', async (req,res)=>{
    const products = await Product.find({})
    availableProducts.push(products)
    res.send(products)
})


//fetch data with specific id 
app.get('/api/products/:id',async(req,res)=>
{
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) 
        {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

const verifyToken = async(req, res, next) => {
        const token = req.headers["x-access-token"];
        console.log("Tokens " +token)
        if (!token) {
            res.send("We need a token, please give it to us next ");
        } 
            jwt.verify(token, "lapiistore", (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.json({ auth: false, message: "you are failed to authenticate"});
                } 
                console.log("Decoded Token:", decoded);
                    req.user = decoded;
                    next();
            });
  };
  
  
  // Endpoint to get user information
  app.get('/user', verifyToken, async (req, res) => {
    try {
        const { id, name,email } = req.user;
        res.json({ id, name ,email});;
      } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });

//send register's data to db
app.post("/register",async(req,res)=>
{
    try
    {
        const{name,email,password,confirm_password,token}=req.body;

    if (!(name && email && password && confirm_password)) {
        return res.json({
            error: "Invalid input. Name and password are required. Password should be at least 6"
        })
      }
   // Check if the email already exists
   const existUser=await Register.findOne({email})
   if(existUser)
   { 
      return res.json({
       error: "User is already registered"
      })
   }
  

      if(password!==confirm_password)
      {
          return res.json(
              {
                  error:"Passwords are different check it "
              }
          )
      }

      // Check if password and confirm_password match
      if (!password || password.length < 6) {
            return res.json({
                error: "Password should be at least 6 characters long"
            });
        }

     
    const myEnc=await bcrypt.hash(password,10)

    const user = await Register.create(
        {
            name,
            email,
            password:myEnc,
            confirm_password:myEnc,
            token:""
        }
    )

    if(user)
    {
        const token =jwt.sign(
            {id:user._id,email},
            'lapiistore',
            {
                expiresIn:"20d"   
            }
        );
        user.token=token;
        await user.save();
        // user.password=undefined
        res.status(201).json(user)
    }
    else{
        return res.status(400).json({msg:"invalid user data "})
    }

    }catch(error)
    {
        console.log("Error",error);
       
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

//send login data to db
app.post("/loginuser",async(req,res)=>
{
  const adminName="Ajay";
  const adminEmail="ajay02@gmail.com";
  const adminPassword="Ajay02";
    try
    {
        const {email,password}=req.body;
        console.log('Received Data:',req.body);
        if(!(email && password))
        {
            return res.json({
                error:"email or password is wrong"
            })
        }
        if(email===adminEmail && password===adminPassword)
        {
          const token=jwt.sign(
            {adminName,adminEmail,role:"admin"},
            'lapiistore',
            {
                expiresIn:"20d"   
            }
        );
         return res.status(200).json({
          success: true,
          token,
          user: { email, role: "admin" }
        }); 

        }
        else 
        {
        const user =await Register.findOne({email})

        if(user && (await bcrypt.compare(password,user.password)))
        {
            const token=jwt.sign(
                {id:user._id,email,name:user.name},
                'lapiistore',
                {
                    expiresIn:"20d"   
                }
            )
            user.token=token;
            await user.save();
            const options={
                expires:new Date(Date.now()+20 * 24 * 60 * 60 * 1000),
                httpOnly:true
            };

            res.status(200).cookie("token",token,options).json({
                success:true,
                token,
                user
            })
        }
        else{
            return res.status(404).json({msg:'invalid user data'})
        }
      }
    }catch(error)
    {
        console.log("Error",error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

// Endpoint to add product to the cart
app.post('/addtocart',  async (req, res) => {
    try {
      const { authToken,products  } = req.body;
      const { name, id, description, quantity, cost } = products;
      console.log('Received Data:', products);
        const cart = await Cart.findOneAndUpdate(
          { authToken: authToken },
          {
            $push: {
              products: {
                name,id,description,quantity,cost
              },
            },
          },
          { new: true, upsert: true }
        );
        // res.json(cart);
        res.status(200).json({ success: true, message: 'Product added to the cart', cart });
      
    } catch (error) {
      console.error('Error adding product to the cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Add a new endpoint to get cart items
app.get('/getcart/:authToken',async (req, res) => {
    try {
      const { authToken } = req.params;
      console.log('auth '+authToken)
      const cart = await Cart.findOne({ authToken });
      console.log('cart '+cart);
      
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      res.status(200).json({ success: true, cart });
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


    // Delete a new endpoint to del cart items
    app.delete('/deleteCart/:authToken/:id', async (req, res) => {
        try {
          const { id, authToken } = req.params; 
          console.log('Received delete request with authToken:', authToken, 'and id:', id);
          const cart = await Cart.findOneAndUpdate(
            { authToken: authToken },
            {
              $pull: {
                products: {
                  _id: id,
                },
              },
            },
            { new: true }
          );
      
          if (!cart) {
            return res.status(404).json({ error: 'Product not found in the cart' });
          }
      
          res.status(200).json({ success: true, cart });
        } catch (error) {
          console.log('Error deleting product from cart:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });


      //user address details endpoint while checkout
      app.post('/useraddress',async(req,res)=>
      {
        try {
          const { authToken,userAddress  } = req.body;
          const { firstName,lastName,address,city,state,zip,country } = userAddress;
          console.log('Received Data:', userAddress);
            const useraddress = await Address.findOneAndUpdate(
              { authToken: authToken },
              {
                $push: {
                  userAddress: {
                    firstName,lastName,address,city,state,zip,country
                  },
                },
              },
              { new: true, upsert: true }
            );
            res.status(200).json({ success: true, message: 'Address added to the user', useraddress });
          
        } catch (error) {
          console.error('Error adding product to the cart:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      })

      //get the address of the user endpoint
      app.get('/getaddress/:authToken',async(req,res)=>
   {
    try {
        const {authToken} = req.params;
        const User = await Address.find({authToken});
        console.log(User);
        if (!User) 
        {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.json(User);
      } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

    //post the payment of user
    app.post(('/payment'),async(req,res)=>
    {
      try {
      const {token,totalAmount} = req.body;
      console.log(token);
      console.log(totalAmount)

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount*100,
      currency: 'inr',
      customer: customer.id,
      receipt_email: token.email,
      description: 'Laptop',
    });
    console.log('Payment successful:', paymentIntent);
    res.status(200).json({ success: true, message: 'Payment successful', paymentIntent });

  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
    })
    //update the buy product endpoint
  app.put('/buyproducts',  async (req, res) => {
    try {
      const { authToken,products  } = req.body;
      const { name, id, description, quantity, cost } = products;
      console.log('Received Data:', products);
      const User =await Buy.find({authToken})
      if(!User)
      {
        await Buy.create({
          authToken,
          name, id, description, quantity, cost
        })
        res.json({message:"Product Added"})
      }
      else
      {
        const user = await Buy.findOneAndUpdate(
          { authToken: authToken },
          {
            $set: {
              name, id, description, quantity, cost
            },
          },
          { new: true, upsert: true }
        );
        res.status(200).json({ success: true, message: 'Address added to the user', user });
      }
    } catch (error) {
      console.error('Error adding product to the cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

 
    //get the address of the user endpoint
    app.get('/getbuy/:authToken',async(req,res)=>
    {
     try {
         const {authToken} = req.params;
         const User = await Buy.find({authToken});
         console.log(User);
         if (!User) 
         {
             return res.status(404).json({ error: 'Address not found' });
         }
         res.json(User);
       } catch (error) {
         console.error('Error fetching product details:', error);
         res.status(500).json({ error: 'Internal server error' });
       }
 })


    //delete the item of the product endpoint
    app.delete('/deleteQuantity',async(req,res)=>
    {
      try
      {
      const quantity = req.body;
      console.log('quantity ' + quantity);
      for (const productID of quantity) {
        const product = await Product.findOne({ id: productID });

        if (product) {
          if(parseInt(product.quantity)>0)
          {
          const updatedQuantity = parseInt(product.quantity) - 1;
          await Product.updateOne({ id: productID }, { quantity: updatedQuantity });
          }
      } else {
          console.log(`Product with ID ${productID} not found.`);
      }
    }
      res.status(200).json({ success: true, message: 'Quantity updated successfully' });
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    })

    //delete the item of the product endpoint
    app.delete('/deleteQuantity1',async(req,res)=>
    {
      try
      {
      const {quantity} = req.body;
      console.log('single '+ quantity);
      const product = await Product.findOne({ id: quantity });

        if (product) {
            if (parseInt(product.quantity) > 0) {

                const updatedQuantity = parseInt(product.quantity) - 1;
                await Product.updateOne({ id: quantity }, { quantity: updatedQuantity });

                res.status(200).json({ success: true, message: 'Quantity updated successfully' });
            } else {
                res.status(400).json({ success: false, message: 'Quantity cannot be less than 0' });
            }
        } else {
            console.log(`Product with ID ${quantity} not found.`);
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    })

    //delete the whole item in the cart endpoint
    app.delete('/deleteItem/:authToken',async(req,res)=>
    {
      try
      {
          const {authToken} =req.params;
          const findItem = Cart.findOne({authToken});
          if(findItem)
          {
            await Cart.deleteOne({ authToken });
           res.status(200).json({ success: true, message: 'Cart deleted successfully' });
    } else {
          }
      }catch(error)
      {
        console.error('Error deleting cart:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    })

    //send conformation mail to the user 
    app.post('/sendemail',async(req,res)=>
    {
      const mail=req.body;
      console.log(mail);
      console.log(mail.orderedId);
        var sender = nodeMailer.createTransport({
          service:'gmail',
          auth:{
            user : '56510.ajay@gmail.com',
            pass : 'abxg pwiy wqeq fhwb'
          }
        });

        var composemail = {
          from : '56510.ajay@gmail.com',
          to: mail.authToken,
          subject : `Order ${mail.orderedId} is successfully confirmed`,
          text:'We will send you an update when your order has shipped.'
        }
        sender.sendMail(composemail,function(error,info)
        {
          if(error)
          {
            console.log(error);
          }
          else
          {
            console.log("Mail Done :"+info.response)
          }
        })
    })
app.listen(PORT,()=>
{
    console.log(`Port Connected ${PORT}`);
})


module.exports=app;
