import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CarouselSlider from "./components/CarouselSlider";
import Products from "./components/Products";
import Register from "./pages/Register";
import SpecificProduct from "./pages/SpecificProduct";
import SignInSide from "./pages/Signin";
import {Toaster} from "react-hot-toast"
import ScrollButton from "./components/ScrollButton"
import StickyFooter from "./components/Footer";
import Cart from "./pages/Cart"
import ScrollToTop from "./components/ScrollToTop"
import Checkout from "./pages/Checkout";
import Checkout1 from "./pages/Checkout1"
function App() {
  return (
    <>
    <Homepage/>  
    <ScrollButton/>
    <ScrollToTop/>
    <Toaster position="top-center" toastOptions={{duration:3000}}/>
    <Routes>  
      <Route path="/"></Route>
       <Route Component={CarouselSlider} path="/"></Route>
       <Route Component={StickyFooter} path="/"></Route>
      <Route Component={Products} path="/products"></Route>
      <Route Component={Register} path="/signup"/>  
      <Route Component={SpecificProduct} path="/api/products/:id"></Route>
      <Route Component={Checkout} path="/checkout"></Route>
      <Route path="/getcart/:authToken" element={<Cart />} />
      <Route Component={Checkout1} path="/directcheckout"></Route>
    </Routes>
    
    <StickyFooter/> 
    </>
  );
}
export default App;
