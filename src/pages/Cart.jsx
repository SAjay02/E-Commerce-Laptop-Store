import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {delCart,addCart,remvoCart} from "../redux/action/index"
import { NavLink } from 'react-router-dom'
import dell from "../assets/dell.png"
import rog from "../assets/rog.png"
import lenovo from "../assets/lenovo.png"
import tuf from "../assets/tuf.png"
import hp from "../assets/hp.png"
import msi from "../assets/msi.png"
import mi from "../assets/mi.png"
import samsung from "../assets/samsung.png"
import "./Cart.css"
import {Row} from "react-bootstrap"
import Allcart from "./Allcart"

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

const Cart = () => {
  const state = useSelector((state)=> state.handleCart)|| [];
  console.log('Cart Items:', state);
  const dispatch = useDispatch();

const handleIncrease = (item) => {
  const maxQuantity = item.quantity;

  if (item.qty < maxQuantity) {
    dispatch(addCart(item));
  } else {
    console.log('Out of Stock');
    alert("Out Of Stock")
  }
};

const handleDecrease = (item) => {
  dispatch(delCart(item)); 
};

const handleRemove = (item) => {
  dispatch(remvoCart(item));
};

const cartItems = (cartItem) => {
  const imgItem = product_image.find((item) => item.id === cartItem.id);
  const totalPrice=Number(cartItem.cost)+20000;
  const calculateDiscount=(Number(cartItem.cost)/totalPrice)*100;
  const totalDiscount=Math.floor(Number(100-calculateDiscount))
  return(
    <>
    <div>
    <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id} style={{}}>
    <div className="container py-4 cont">
      <div className="row justify-content-center">
        {/* <div className="head">
      <div className="heading_cont">Shopping Cart</div>
      <div className="head_last_cont">Price</div>
      </div> */}
      
        <div className="col-md-4 col-lg-4">
          {/* Assuming the property is 'img' */}
          <img src={imgItem.img} alt={cartItem.name} className="img_cont"/>
        </div>


        <div className="col-md-4 col-lg-4">
          {/* Assuming the properties are 'name' and 'cost' */}
          <h5 className="item_head">{cartItem.name}</h5>
          <p className="item_desc">{cartItem.description}</p>
          <p className="quan_cont">Quantity: {cartItem.qty}</p>
          <div className="btn_cont" role="group" aria-label="Quantity">
              <button type="button" className="btn btn-outline-secondary sub_btn" onClick={() => handleDecrease(cartItem)}>
              <i class="fa-solid fa-minus fa-2xs" style={{color: "#020a17"}}></i>
              </button>
              {/* <div className="">
              <span className="seperate_item">|</span>
              </div> */}
              <button type="button" className="btn btn-outline-secondary add_btn" onClick={() => handleIncrease(cartItem)}>
              <i class="fa-solid fa-plus fa-2xs" style={{color: "#010813"}}></i>
              </button>
              {/* <div className="">
              <span className="seperate_item">|</span>
              </div> */}
            </div>
            <button type="button" className="btn btn-outline-secondary btn_remove" onClick={() => handleRemove(cartItem)}>
            <i class="fa-solid fa-trash" style={{color: "#e00b0b",marginRight:"4px"}}></i> Remove
            </button>
           
        </div>

              
        <div className="col-md-4 col-lg-4 all_prices">
        {/* <p className="lead fw-bold">Total Amount: <i className=" fa-sharp fa-solid fa-indian-rupee-sign rup_siz" ></i>
          {state.reduce((total, item) => total + item.qty * item.cost, 0).toFixed(2)}
        </p> */}
        <Row>
        <h5 className="discount_offer">{totalDiscount}% off</h5>
        </Row>
        <Row>
          <div className="org_price">
        <p className=""><i className=" fa-sharp fa-solid fa-indian-rupee-sign fa-xs rup_siz" ></i>{cartItem.cost}.00</p>
        </div>
        </Row>
        <Row>
        <h6 className="dicount">M.R.P: {totalPrice}.00</h6>
        </Row>
          </div>
          <hr/>
      </div>
    </div>
  </div>
  </div>
  </>
  );
}

const emptyCart = () => {
  return (
      <div className="px-4 my-5 bg-light rounded-3 ">
          <div className="container py-4">
              <div className="row">
                <div className=" d-flex">
                  <h3 className="empty_cart_head">Your Cart is Empty</h3>
                  <img loading="lazy" className="empty_cart_img" src='https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png' alt=''/>
                  </div>
              </div>
              </div>
          </div>
  );
}

const button = () => {
  return(
      <div className="container">
          <div className="row">
            <div className="subtot_cont">
          <p className="subtot_name">Subtotal:</p>
          <i className=" fa-sharp fa-solid fa-indian-rupee-sign fa-xs rup_subtot" ></i>
          <p className="tot-amount">
          {state.reduce((total, item) => total + item.qty * item.cost, 0).toFixed(2)}
          </p>
          </div>
              <NavLink to="/checkout" className="btn mx-auto checkout">Proceed To Buy</NavLink>
          </div>
      </div>
  );
}


  return (
    <>
        <div className="head">
      <div className="heading_cont">Shopping Cart</div>
      <div className="head_last_cont">Price</div>
      </div>
      <hr/>
        {state.length === 0 && emptyCart()}
        {state.length !== 0 && state.map(cartItems)}
        {state.length !== 0 && button()}

    </>
  )
}

export default Cart