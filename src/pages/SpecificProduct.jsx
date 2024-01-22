import React from 'react'
import { useState,useEffect } from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios'
import { Card, Container,Button } from 'react-bootstrap'
import {Row,Col} from "react-bootstrap"
import Skeleton from 'react-loading-skeleton';
import dell from "../assets/dell.png"
import rog from "../assets/rog.png"
import lenovo from "../assets/lenovo.png"
import tuf from "../assets/tuf.png"
import hp from "../assets/hp.png"
import msi from "../assets/msi.png"
import mi from "../assets/mi.png"
import samsung from "../assets/samsung.png"
import "./SpecificProduct.css"
import {useDispatch} from "react-redux"
import {addCart} from "../redux/action"
// import {addCart} from "../redux/action/cartActions"
import {toast} from "react-hot-toast"
import Cookies from 'js-cookie';
import {useNavigate,NavLink} from "react-router-dom"

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
const SpecificProduct = () => {
  const navigate=useNavigate();
  const {id} = useParams();
  const [product,setProduct]=useState({});
   const [loading,setLoading]=useState(false);
   const [isVisibletop ,setIsVisibletop]=useState(false);
   const [cart, setCart] = useState([]);
  const item = [];
  const authToken = Cookies.get('token');
  const email=Cookies.get('email');
  const dispatch = useDispatch();
  
  useEffect(() => {
    const existingProducts = JSON.parse(localStorage.getItem(authToken)) || [];
    setCart(existingProducts);
  }, [authToken]);
  
  const addProduct = (product) => {
    try
    {
      const data = {
        authToken: email, // This should be the user's authentication token
        products: product, // The ID of the product you want to add to the cart
      };
        console.log('Data:', data); 
        axios.post("http://localhost:8000/addtocart",data).then((response)=>console.log(response)).catch((error)=>console.log(error));
    } 
    catch(event){
      console.log("Error:"+event);
    }
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    console.log(cart)
    //console.log('Adding product to cart:', product);
    dispatch(addCart(product));
    toast.success(`${product.name} added to the cart!`);
    localStorage.setItem(authToken, JSON.stringify(updatedCart));
  };

  const buyProduct = (product) => {
    try
    {
      const data = {
        authToken: email, // This should be the user's authentication token
        products: product, // The ID of the product you want to add to the cart
      };
        console.log('Data:', data); 
        axios.put("http://localhost:8000/buyproducts",data).then((response)=>console.log(response)).catch((error)=>console.log(error));
        navigate('/directcheckout')
    } 
    catch(event){
      console.log("Error:"+event);
    }
  };
useEffect(() => {
  //console.log('Fetching product details for ID:', id);
  axios
    .get(`http://localhost:8000/api/products/${id}`)
    .then((response) => {
      setProduct(response.data);
      console.log('API response:', response);
    })
    .catch((error) => {
      console.error('Error fetching product details:', error);
    });
}, [id]);
const imgItem = product_image.find((item) => item.id === product.id);
console.log(imgItem)
 const totalPrice=Number(product.cost)+20000;
const calculateDiscount=(Number(product.cost)/totalPrice)*100;
const totalDiscount=Math.floor(Number(100-calculateDiscount));

useEffect(() => {
  // Trigger the animation after the component has mounted
  
  setIsVisibletop(true);
}, []);
  return (
    <div className={`fade-in-from-top ${isVisibletop ? 'visible' : ''}`}>
    <div className="mt-5 container__ p-3" >
        <Container style={{marginTop:"80px"}} >
              <Row>
                <Col className="col-sm-12">
                  
                  <Row>
                          <Col  className="img_cont">{imgItem && imgItem.img ?(<img src={imgItem.img} alt="Product" className="img"/>):(
        <Skeleton height={200} width={200} count={3}/> )}
    <div className="d-flex buttons">
          <button className="btn-buy"onClick={()=>addProduct(product)}><i className="fa-solid fa-cart-shopping" style={{color:"0d0d0d",marginRight:"4px"}} ></i>ADD TO CART</button>
          <button className="btn-add" onClick={()=>buyProduct(product)}><i className=" fa-brands fa-buy-n-large fa-bounce rup_siz" style={{color:"0d0d0d",fontSize:"19px"}}></i>BUY NOW</button>
          </div>
        </Col>
                          <Col className="col_two">
                          <Row className="product_name">{product.name}</Row>
                          <Row className="product_desc">{product.description}</Row>
                          {/* <hr/> */}
                          <Row className="price_cont">Special Price</Row>
                          <Row>
                            <div  className="product_cost ">
                            <h3 className="d-inline-flex"><i className=" fa-sharp fa-solid fa-indian-rupee-sign rup_siz" ></i>{product.cost} <h6 className="dicount">M.R.P: {totalPrice}</h6><h5 className="discount_offer">{totalDiscount}% off</h5></h3>
                            </div>
                            </Row>
                            <Row className="avail_offer">Available Offers</Row>
                            <Row>
                              <div className="spcl_offer">
                              <i class="fa-solid fa-tag tag_icon" style={{color: "#4fde60"}}></i>
                              <span className="avail_cont" style={{color:"#212121"}}>Special Offer</span>
                              <p className="avail_cont">Get extra 25% off (price inclusive of cashback/coupon).</p>
                              </div>
                            </Row>
                            <Row>
                              <div className="spcl_offer">
                              <i class="fa-solid fa-tag tag_icon" style={{color: "#4fde60"}}></i>
                              <span className="avail_cont" style={{color:"#212121"}}>Special Offer</span>
                              <p className="avail_cont">Get extra 10% off (first time new user to buy).</p>
                              </div>
                            </Row>
                            <Row>
                              <div className="spcl_offer">
                              <i class="fa-solid fa-tag tag_icon" style={{color: "#4fde60"}}></i>
                              <p className="avail_cont">Buy This Product and get ₹500 Off on Next AC Purchase*.</p>
                              </div>
                            </Row>
                            <Row>
                              <div className="spcl_offer">
                              <i class="fa-solid fa-tag tag_icon" style={{color: "#4fde60"}}></i>
                              <p className="avail_cont">If your are student get extra ₹1000 Off.</p>
                              </div>
                            </Row>
                            <Row>
                              <div className="spcl_offer">
                              <i class="fa-solid fa-tag tag_icon" style={{color: "#4fde60"}}></i>
                              <span className="avail_cont" style={{color:"#212121"}}>Bank Offer</span>
                              <p className="avail_cont">5% Cashback on Flipkart Axis Bank Card.</p>
                              </div>
                            </Row>
                            <Row>
                              <div className="spcl_offer">
                              <i class="fa-solid fa-tag tag_icon" style={{color: "#4fde60"}}></i>
                              <p className="avail_cont">Buy for 100 get ₹200 off your Next Buy.</p>
                              </div>
                            </Row>
                          </Col>
                    </Row>
                  </Col>
              </Row>
        </Container>
    </div>
    </div>
  )
}

export default SpecificProduct