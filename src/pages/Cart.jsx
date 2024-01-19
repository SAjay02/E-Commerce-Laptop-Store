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
import Cookies from 'js-cookie';
import {useState,useEffect} from "react"
import axios from 'axios'



const email=Cookies.get('email');
console.log(email)

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
  const authToken = Cookies.get('email');
  const [cartItemsFromDb, setCartItemsFromDb] = useState();
   useEffect(() => {
    if(authToken)
    {
      console.log(authToken)
    axios.get(`http://localhost:8000/getcart/${authToken}`)
      .then((response) => {
        setCartItemsFromDb(response.data.cart.products)
        console.log('Response ',response)
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
    }else
    {
      setCartItemsFromDb([]);
    }
  }, [authToken]);

   //console.log('Cart Items:', state);
  //  console.log('length of cart '+cartItemsFromDb.length)
//    cartItemsFromDb.map((item, index) => {
//   console.log(`Product ${index + 1}:`, item);
//   return null; 
// });
   const dispatch = useDispatch();
 
const handleIncrease = (item) => {
  const updatedCart = cartItemsFromDb.map((cartItem) =>
    cartItem.id === item.id ? { ...cartItem, quantity: Number(cartItem.quantity)-Number(cartItem.quantity) + 1 } : cartItem
  );
// Check if the updated quantity is less than or equal to the quantity in the database
const updatedQuantity = updatedCart.find(
  (cartItem) => cartItem.id === item.id
).quantity;

// Get the corresponding item from the database
const dbItem = cartItemsFromDb.find((dbCartItem) => dbCartItem.id === item.id);

// If the updated quantity is less than or equal to the quantity in the database, update the state
if (updatedQuantity <= dbItem.quantity) {
  setCartItemsFromDb(updatedCart);
} else {
  console.log('Cannot add more items than available in the database');
  alert('Out Of Stock')
  // You can show an alert or handle this case as per your application logic
}
};

const handleDecrease = (item) => {
  const updatedCart = cartItemsFromDb.map((cartItem) =>
    cartItem.id === item.id ? { ...cartItem, quantity: Number(cartItem.quantity) - 1 } : cartItem
  );

  setCartItemsFromDb(updatedCart);
};

const handleRemove = (cartItem) => {
  console.log(cartItem._id)
  axios.delete(`http://localhost:8000/deleteCart/${authToken}/${cartItem._id}`)
  .then((response)=>console.log('Deleted Response: '+response))
  .catch((error) => console.error('Error deleting product from cart:', error));
  const updatedCartItems = cartItemsFromDb.filter((item) => item._id !== cartItem._id);
      setCartItemsFromDb(updatedCartItems);
};
/*
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
        <div className="col-md-4 col-lg-4">
          <img src={imgItem.img} alt={cartItem.name} className="img_cont"/>
        </div>


        <div className="col-md-4 col-lg-4">
          <h5 className="item_head">{cartItem.name}</h5>
          <p className="item_desc">{cartItem.description}</p>
          <p className="quan_cont">Quantity: {cartItem.qty}</p>
          <div className="btn_cont" role="group" aria-label="Quantity">
              <button type="button" className="btn btn-outline-secondary sub_btn" onClick={() => handleDecrease(cartItem)}>
              <i class="fa-solid fa-minus fa-2xs" style={{color: "#020a17"}}></i>
              </button>
              <button type="button" className="btn btn-outline-secondary add_btn" onClick={() => handleIncrease(cartItem)}>
              <i class="fa-solid fa-plus fa-2xs" style={{color: "#010813"}}></i>
              </button>
            </div>
            <button type="button" className="btn btn-outline-secondary btn_remove" onClick={() => handleRemove(cartItem)}>
            <i class="fa-solid fa-trash" style={{color: "#e00b0b",marginRight:"4px"}}></i> Remove
            </button>
           
        </div>

              
        <div className="col-md-4 col-lg-4 all_prices">
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
*/
const calculateSubtotal = (cartItem) => {
  return Number(cartItem.cost) || 0;
};

const calculateTotalSubtotal = () => {
  if (cartItemsFromDb && cartItemsFromDb.length > 0) {
    return cartItemsFromDb.reduce(
      (total, cartItem) => Number(total) + Number(calculateSubtotal(cartItem)),
      0
    );
  }
  return 0;
};

if (!cartItemsFromDb) {
  return <div>Loading...</div>; // You can replace this with a loading component
}
console.log(cartItemsFromDb)
  return (
    <>
        <div className="head">
      <div className="heading_cont">Shopping Cart</div>
      <div className="head_last_cont">Price</div>
      </div>
      <hr/>
       {/* {state.length === 0 && emptyCart()}
        {state.length !== 0 && state.map(cartItems)}
        {state.length !== 0 && button()} */}
       { cartItemsFromDb.length === 0 && (
        <div className="px-4 my-5 bg-light rounded-3 ">
          <div className="container py-4">
            <div className="row">
              <div className=" d-flex">
                <h3 className="empty_cart_head">Your Cart is Empty</h3>
                <img
                  loading="lazy"
                  className="empty_cart_img"
                  src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
       )}
      {cartItemsFromDb.length !== 0 &&
        cartItemsFromDb.map((cartItem) => {
          const imgItem = product_image.find((item) => item.id === cartItem.id);
          const totalPrice = Number(cartItem.cost) + 20000;
          const calculateDiscount = (Number(cartItem.cost) / totalPrice) * 100;
          const totalDiscount = Math.floor(100 - calculateDiscount);
          return (
            <div key={cartItem.id}>
              <div
                className="px-4 my-5 bg-light rounded-3"
                style={{}}
              >
                <div className="container py-4 cont">
                  <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-4 ">
                      <div className="">
                      <img
                        src={imgItem.img}
                        alt={cartItem.name}
                        className="img_container"
                        style={{height:"250px"}}
                      />
                      </div>
                    </div>

                    <div className="col-md-4 col-lg-4 col-two">
                      <h5 className="item_head">{cartItem.name}</h5>
                      <p className="item_desc">{cartItem.description}</p>
                      <p className="quan_cont">
                        Quantity: {Number(cartItem.quantity)-Number(cartItem.quantity)+1}
                      </p>
                      <div
                        className="btn_cont"
                        role="group"
                        aria-label="Quantity"
                      >
                        <p className="add_btn">Available Stocks:<span style={{fontWeight:"bold",marginLeft:"3px"}}>{cartItem.quantity}</span></p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn_remove"
                        onClick={()=>handleRemove(cartItem)}
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: '#e00b0b', marginRight: '4px' }}
                        ></i>{' '}
                        Remove
                      </button>
                    </div>

                    <div className="col-md-4 col-lg-4 all_prices">
                      <Row>
                        <h5 className="discount_offer">{totalDiscount}% off</h5>
                      </Row>
                      <Row>
                        <div className="org_price">
                          <p className="">
                            <i className="fa-sharp fa-solid fa-indian-rupee-sign fa-xs rup_siz"></i>
                            {cartItem.cost}.00
                          </p>
                        </div>
                      </Row>
                      <Row>
                        <h6 className="dicount">M.R.P: {totalPrice}.00</h6>
                      </Row>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          ); 
        })}
        {cartItemsFromDb.length!==0 && 
          cartItemsFromDb.map((cartItem)=>
          {
            return(
              <>
               <div className="container">
          <div className="row">
            <div className="subtot_cont">
          <p className="subtot_name">Subtotal:</p>
          <i className=" fa-sharp fa-solid fa-indian-rupee-sign fa-xs rup_subtot" ></i>
          <p className="tot-amount">
          {`${calculateTotalSubtotal()}.00`}
          </p>
          </div>
              <NavLink to="/checkout" className="btn mx-auto checkout">Proceed To Buy</NavLink>
          </div>
      </div>
              </>
            )
          })
        }
    </>
  )
}

export default Cart