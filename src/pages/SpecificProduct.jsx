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
import { faL } from '@fortawesome/free-solid-svg-icons'


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

  const {id} = useParams();
  const [product,setProduct]=useState({});
   const [loading,setLoading]=useState(false);
   const [isVisibletop ,setIsVisibletop]=useState(false)
  const item = [];

  const dispatch = useDispatch();
  const addProduct = (product) => {
    //console.log('Adding product to cart:', product);
    dispatch(addCart(product));
    toast.success(`${product.name} added to the cart!`);
  };
    // Use these functions to dispatch user-specific actions
  //   const addProduct = (product) => {
  //     console.log('Before dispatch:', product);
  // dispatch(addCart(product));
  // console.log('After dispatch');
  //   };

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
                          <Col  className="img_cont">{imgItem && imgItem.img ?(<img src={imgItem.img} alt="Product" className="img_cont"/>):(
        <Skeleton height={200} width={200} count={3}/> )}
    <div className="d-flex">
          <button className="btn-buy"onClick={()=>addProduct(product)}><i className="fa-solid fa-cart-shopping" style={{color:"0d0d0d",marginRight:"4px"}} ></i>ADD TO CART</button>
          <button className="btn-add"><i className=" fa-brands fa-buy-n-large fa-bounce rup_siz" style={{color:"0d0d0d",fontSize:"19px"}}></i>BUY NOW</button>
          </div>
        </Col>
                          <Col>
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
                              <span>Special Offer</span>
                              <p>Get extra 10% off (first time new user to buy)</p>
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