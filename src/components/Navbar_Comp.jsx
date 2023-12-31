import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar_Comp.css";
import logo from "../assets/Logo.png";
import {Link, Route,Routes,useNavigate,useLocation} from "react-router-dom" 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'; 
import Home from './Home';
import {Button,Form,NavDropdown} from "react-bootstrap"
import SignInSide from "../pages/Signin"
import Cart from '../pages/Cart';
import All_Product from "../pages/All_Product"
import Add_Products from "../pages/Add_Products"
import Allcart from "../pages/Allcart"
import {useSelector,useDispatch} from "react-redux"
import { useEffect ,useState} from 'react';
import axios from 'axios';
import {toast,Toaster} from "react-hot-toast"

import Cookies from 'js-cookie';
import {setUser,addToCart,removeFromCart} from "../redux/action/userActions"


const Navbar_Comp = ({sections }) => {

  // const dispatch = useDispatch();
  // const handleCart = useSelector((state) => state.handleCart);



  // const handleRemoveFromCart = (productId) => {
  //   dispatch(removeFromCart(productId));
  // };

  const state = useSelector((state) => state.handleCart) || []
  const authToken = Cookies.get('token');
  console.log('authToken:', authToken);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [cartCount, setCartCount] = useState(0); 
  console.log('Current cart state:', state);
  const navigate=useNavigate();  
  useEffect(() => {
    // Fetch the user's information from the backend using the authToken
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user', {
          headers: {
            "x-access-token": authToken
          },
        }).then((response)=>
        {
          console.log('User info data:', response.data); 
          console.log('User info name:', response.data.name); 
          setUsername(response.data.name);
          setUserId(response.data.id);
        });
      } catch (error) {
        console.log('Error fetching user info:', error);
      }
    };

    if (authToken) {
      fetchUserInfo();
    }
  }, [authToken]);

  console.log(username)

  // useEffect(() => {
  //   setCartCount(handleCart.length);
  // }, [handleCart]);

  const handleLogout = () => {
    // Clear the authentication token from the cookie
    Cookies.remove('token');
    setUsername('');
    // Redirect to the login page or any other desired page
    setUserId('');
    navigate('/login');
  };

 
  return (
    <>
    <div style={{backgroundColor:"#2d8eeb"}}>
        <Navbar expand="lg" className=" py-2 shadow-sm  navbar-fixed-top fixed-top" style={{backgroundColor:"#2d8eeb"}}>
      <Container fluid> 
        <img alt="" src={logo} className="logo " onClick={()=>navigate('/')}/>
        <Navbar.Brand  className="nav-items-tit mx-2 ">Lapii-<span>Store</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-between" style={{ marginLeft: 'auto' }} defaultActiveKey="/home">
            {/* <Nav.Link as={Link} to="/home" className="nav-items-clr justify-content-center">Home</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/product" className="nav-items-clr">Products</Nav.Link> */}
            <NavDropdown title="Products" id="collapsible-nav-dropdown" className="nav-items-clr" style={{fontSize:""}}>
              <NavDropdown.Item as={Link} to="/all_products" className='common_under'>All Products</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add_products" className='common_under'>
                Add Products
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={ScrollLink} to="about" smooth={true} duration={100} className="nav-items-clr">About</Nav.Link>
            <Nav.Link  className="nav-items-clr">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" justify-content-between" style={{margin:"auto"}}>
          <Form className="d-flex my-1  position-relative d-inline-block">
            <Form.Control
              type="search"
              placeholder="Search.."
              className=" nav-items-clr"
              aria-label="Search"
              style={{border:"2px solid #0978e3"}}
            />
            <i class="fa-solid fa-magnifying-glass fa-lg search_icon"></i>
            <NavDropdown title="All Categories" id="collapsible-nav-dropdown" className="nav-items-clr border-2" style={{backgroundColor:"white",borderRadius:"7px",border:"1px solid #0978e3"}}>
              <NavDropdown.Item  className='common_under'>Gaming</NavDropdown.Item>
              <NavDropdown.Item  className='common_under'>Business</NavDropdown.Item>
              <NavDropdown.Item  className='common_under'>Education</NavDropdown.Item>
            </NavDropdown>
          </Form> 
          </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" justify-content-between" style={{margin:"auto"}}>
          <Nav.Link as={Link} to="/cart" className="nav-items-clr"><Button className="  my-1"variant="outline-primary" ><i className="fa fa-shopping-cart me-1"></i>Cart<sup>({state.length})</sup> </Button></Nav.Link>
             {authToken ? (
          <>
          <i class="fa-solid fa-user"></i>
            <span className="" style={{color:"black"}}>{`Hello ${username}!`}</span>
            <Nav.Link onClick={handleLogout} className="nav-items-clr">
              <Button className="my-1" variant="outline-danger" onClick={()=>toast.success("Logged Out Successfully")}>
                <i className="fa fa-sign-out me-1"></i>Logout
              </Button>
            </Nav.Link>
          </>
        ) : (
          <>
           <i class="fa-solid fa-user"></i>
            <span className="" style={{color:"black"}}>{`Hello !`}</span>
            <Nav.Link as={Link} to="/login" className="nav-items-clr">
            <Button className="my-1" variant="outline-success">
              <i className="fa fa-sign-in me-1"></i>Login
            </Button>
          </Nav.Link>
          </>
        )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    <div>
          <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/all_products'element={<All_Product/>}/>
                <Route path="add_products" element={<Add_Products/>}/>  
                <Route path='/login' element={<SignInSide/>}/> 
                <Route path='/cart' element={<Cart/>}/>      
          </Routes>
    </div>
    </>
  )
}

export default Navbar_Comp