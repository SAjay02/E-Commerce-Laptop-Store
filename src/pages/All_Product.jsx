import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import {Card,Col, Button} from "react-bootstrap"
import "./All_Product.css";
import Skeleton from 'react-loading-skeleton';
import dell from "../assets/dell.png"
import rog from "../assets/rog.png"
import lenovo from "../assets/lenovo.png"
import tuf from "../assets/tuf.png"
import hp from "../assets/hp.png"
import msi from "../assets/msi.png"
import mi from "../assets/mi.png"
import samsung from "../assets/samsung.png"
import {useNavigate,NavLink} from "react-router-dom"
import Cookies from 'js-cookie';
import {useDispatch} from "react-redux"
import {addCart} from "../redux/action"

import {toast} from "react-hot-toast"

import offer from "../assets/Offer.png"
const item = [];
const product_image=[
  {
    id:"3",
    img:dell
  },
  {
    id:"1",
    img:"https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/g-series/g15-5530/media-gallery/purple/non-touch/1-zone-coral-kb/notebook-g15-5530-nt-coral-kb-purple-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=554&qlt=100,1&resMode=sharp2&size=554,402&chrss=full"
  },
  {
    id:"2",
    img:rog 
  },
  {
    id:"4",
    img:lenovo
  },
  {
    id:"5",
    img:tuf
  },
  {
    id:"6",
    img:hp
  },
  {
    id:"7",
    img:msi
  },
  {
    id:"8",
    img:mi
  },
  {
    id:"9",
    img:samsung
  }
]
function ProductCard({product}) {
  const email=Cookies.get('email');
  const imgItem = product_image.find((item) => item.id === product.id);
  const totalPrice=Number(product.cost)+20000;
const calculateDiscount=(Number(product.cost)/totalPrice)*100;
const totalDiscount=Math.floor(Number(100-calculateDiscount));
  const navigate=useNavigate();
  function handlePass()
  {
    navigate(`/api/products/${product._id}`);
  }
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success(`${product.name} added to the cart!`);

  };
  console.log(imgItem.img);
  const buyProduct = async(product) => {
    
    console.log("Buy product function called");
    try
    {
      const data = {
        authToken: email, 
        products: product, 
      };
        console.log('Data:', data); 
        await axios.put("https://e-com-back.onrender.com/buyproducts",data).then((response)=>
          console.log(response)
        ).catch((error)=>console.log(error));
       navigate('/directcheckout')
    } 
    catch(event){
      console.log("Error:"+event);
    }
  };
  return (
    <>
    <div className="mt-2 shadow-1-soft mb-2  m-3">
     <div className="d-flex">
      <Card className="card_cont shadow mb-3 border-1 " >
        <Card.Header>
        <Card.Img variant="top"src={imgItem.img} className="img_size w-100" onClick={handlePass}/>
        </Card.Header>
        <div  style={{backgroundColor:"aliceblue"}}>
        <Card.Body className="description_font" >
          <Card.Title>{product.name||<Skeleton/>}</Card.Title>      
          <Card.Text className="cost"><i className=" fa-sharp fa-solid fa-indian-rupee-sign rup_siz" ></i>{product.cost}</Card.Text>
        </Card.Body>
       <div className="d-flex justify-content-evenly mb-4 description_font">
        <NavLink  to="directcheckout"><Button className="btn-buy-cart"  onClick={()=>buyProduct(product)}><i className=" fa-brands fa-buy-n-large fa-shake rup_siz" style={{color:"0d0d0d",fontSize:"19px"}}></i>BUY</Button></NavLink>
          <span className="btn-buy-cart border-0 "style={{backgroundColor:"aliceblue",color:"#039703"}}><i class="fa-solid fa-bullhorn fa-beat" style={{color:"#0d0d0d",marginRight:"4px"}}></i><img src={offer} className='offer_img'/>{totalDiscount}<i class="fa-solid fa-percent mx-1"></i></span>
          </div>
        </div>
      </Card>
      </div>
    </div>
   
    </>
  
  );
}
const All_Product = () => {
  const[getproduct,setGetProduct]=useState([]);
  useEffect(()=>
  { 
    axios.get('https://e-com-back.onrender.com/api/products').then(items=>setGetProduct(items.data)).catch(err=>console.log(err));
  },[]);

  getproduct.forEach(i=>{
    item.push(i)
  })
  console.log(getproduct)

  return (
    <>
    <div className="text-center  tit "style={{marginTop:"100px"}}>Our Things</div>
    <div className="d-flex flex-wrap justify-content-center">
      
          {getproduct.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
     
    </div>
    </>
  )
}

export default All_Product