const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const Product=require("./src/Server/Models/productModel");
const Register=require("./src/Server/Models/registerModel");
const Login=require("./src/Server/Models/loginModel");
const connectdb=require("./src/Server/configurations/db");
const app=express();
const PORT=process.env.PORT || 8000;
const jwt=require("jsonwebtoken");
const bcrypt =require("bcrypt")
const cookieParser=require("cookie-parser")
const router = express.Router();

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
        const { id, name } = req.user;
        res.json({ id, name });;
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

            // res.cookie("token", token, options);

            res.status(200).cookie("token",token,options).json({
                success:true,
                token,
                user
            })
            

        }
        else{
            return res.status(404).json({msg:'invalid user data'})
        }
    }catch(error)
    {
        console.log("Error",error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})


app.listen(PORT,()=>
{
    console.log(`Port Connected ${PORT}`);
})
console.log(availableProducts);

module.exports=app;
module.exports=availableProducts; 