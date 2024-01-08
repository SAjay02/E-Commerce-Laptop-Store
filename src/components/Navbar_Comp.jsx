import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar_Comp.css";
import logo from "../assets/Logo.png";
import lapLog from "../assets/MainLogo.png"
import {Link, Route,Routes,useNavigate,useLocation} from "react-router-dom" 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'; 
import Home from './Home';
import {Button,Form,NavDropdown} from "react-bootstrap"
import SignInSide from "../pages/Signin"
import Cart from '../pages/Cart';
import All_Product from "../pages/All_Product"
import Add_Products from "../pages/Add_Products"
import {useSelector,useDispatch} from "react-redux"
import { useEffect ,useState} from 'react';
import axios from 'axios';
import {toast,Toaster} from "react-hot-toast"
import Cookies from 'js-cookie';
import Searchbar from './Searchbar';

const Navbar_Comp = ({sections }) => {

  const state = useSelector((state) => state.handleCart) || []
  const authToken = Cookies.get('token');
  console.log('authToken:', authToken);
  const adminControl =Cookies.get('admin');
  console.log(adminControl);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [cartCount, setCartCount] = useState(0); 
  const [selectedProduct, setSelectedProduct] = useState(null);
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
          Cookies.set('email', response.data.email, { expires: 20 });
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



  const handleLogout = () => {
    // Clear the authentication token from the cookie
    Cookies.remove('token');
    Cookies.remove('email');
    setUsername('');
    // Redirect to the login page or any other desired page
    setUserId('');
    navigate('/login');
  };

  const email = Cookies.get('email');
  const [cartItemsFromDb, setCartItemsFromDb] = useState();
   useEffect(() => {
    if(authToken)
    {
      console.log(authToken)
    axios.get(`http://localhost:8000/getcart/${email}`)
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
  // console.log('length of cart '+cartItemsFromDb.length)
  return (
    <>
    {adminControl!=='admin'?
    //------------------------------------ Below for User side------------------------------- 
    <div style={{backgroundColor:"#2d8eeb"}}>
        <Navbar expand="lg" className=" py-2 shadow-sm  navbar-fixed-top fixed-top" style={{backgroundColor:"#2d8eeb"}}>
      <Container fluid> 
        <img alt="" src={lapLog} className="logo " onClick={()=>navigate('/')}/>
        {/* <Navbar.Brand  className="nav-items-tit  ">Lapii-<span>Store</span></Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav second_cont_item" >
          <Nav className="justify-content-between"  defaultActiveKey="/home">
            <NavDropdown title="Products" id="collapsible-nav-dropdown" className="nav-items-clr" style={{fontSize:""}}>
              <NavDropdown.Item as={Link} to="/all_products" className='common_under'>All Products</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/add_products" className='common_under'>
                Add Products
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link as={ScrollLink} to="about" smooth={true} duration={100} className="nav-items-clr about_cont">About</Nav.Link>
            <Nav.Link  className="nav-items-clr">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <Searchbar setSelectedProduct={setSelectedProduct}/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" justify-content-between third_cont_item" >
          <Nav.Link as={Link} to={`/getcart/${username+Cookies.get('token')}`} className="nav-items-clr"><Button className="cart_cont  my-1"variant="outline-primary"><i className="fa fa-shopping-cart me-1"></i>Cart<sup style={{color:"black"}}>{    }</sup> </Button></Nav.Link>
             {authToken ? (
          <>
          <Nav.Link onClick={handleLogout} className="nav-items-clr logout_cont" >
              <Button className="my-1" variant="outline-danger" onClick={()=>toast.success("Logged Out Successfully")}>
                <i className="fa fa-sign-out me-1"></i>Logout
              </Button>
            </Nav.Link>
          <div className="d-inline-flex me-1 user_head">
          <i class="fa-solid fa-circle-user me-1" style={{color: "white",fontSize:"30px",marginTop:"13px"}}></i>
            <span className="user_cont me">{`Hello ${username}!`}</span>
            </div>
              
          </>
        ) : (
          <>
          
          <Nav.Link as={Link} to="/login" className="nav-items-clr login_cont">
            <Button className="my-1" variant="outline-success">
              <i className="fa fa-sign-in me-1"></i>Login
            </Button>
          </Nav.Link>
          <div className="d-inline-flex me-1 ">
         <i class="fa-solid fa-circle-user me-1" style={{color: "white",fontSize:"30px",marginTop:"13px"}}></i>
            <span  className="user_cont me"  style={{color:"black",marginTop:"17px"}}>{`Hello !`}</span>
            </div>
          </>
        )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    //------------------------------------ Below for admin side------------------------------- 
    :
    <div style={{backgroundColor:"#2d8eeb"}}>
        <Navbar expand="lg" className=" py-2 shadow-sm  navbar-fixed-top fixed-top" style={{backgroundColor:"#2d8eeb"}}>
      <Container fluid> 
        <img alt="" src={lapLog} className="logo " onClick={()=>navigate('/')}/>
        {/* <Navbar.Brand  className="nav-items-tit  ">Lapii-<span>Store</span></Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav second_cont_item" >
          <Nav className="justify-content-between"  defaultActiveKey="/home">
            <NavDropdown title="Products" id="collapsible-nav-dropdown" className="nav-items-clr" style={{fontSize:""}}>
              <NavDropdown.Item as={Link} to="/all_products" className='common_under'>All Products</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add_products" className='common_under'>
                Add Products
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link as={ScrollLink} to="about" smooth={true} duration={100} className="nav-items-clr about_cont">About</Nav.Link> */}
            <Nav.Link  className="nav-items-clr">DashBoard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <Searchbar setSelectedProduct={setSelectedProduct}/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" justify-content-between third_cont_item" >
          {/* <Nav.Link as={Link} to={`/getcart/${username+Cookies.get('token')}`} className="nav-items-clr"><Button className="cart_cont  my-1"variant="outline-primary"><i className="fa fa-shopping-cart me-1"></i>Cart<sup style={{color:"black"}}>{    }</sup> </Button>
          </Nav.Link> */}
             {authToken ? (
          <>
          <Nav.Link onClick={handleLogout} className="nav-items-clr logout_cont" style={{marginLeft:"0px"}}>
              <Button className="my-1" variant="outline-danger" onClick={()=>toast.success("Logged Out Successfully")}>
                <i className="fa fa-sign-out me-1"></i>Logout
              </Button>
            </Nav.Link>
          <div className="d-inline-flex me-1 user_head">
          <i class="fa-solid fa-circle-user me-1" style={{color: "white",fontSize:"30px",marginTop:"13px"}}></i>
            <span className="user_cont me">{`Hello ${adminControl}!`}</span>
            </div>
              
          </>
        ) : (
          <>
          
          <Nav.Link as={Link} to="/login" className="nav-items-clr login_cont">
            <Button className="my-1" variant="outline-success">
              <i className="fa fa-sign-in me-1"></i>Login
            </Button>
          </Nav.Link>
          <div className="d-inline-flex me-1 ">
         <i class="fa-solid fa-circle-user me-1" style={{color: "white",fontSize:"30px",marginTop:"13px"}}></i>
            <span  className="user_cont me"  style={{color:"black",marginTop:"17px"}}>{`Hello !`}</span>
            </div>
          </>
        )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
}
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