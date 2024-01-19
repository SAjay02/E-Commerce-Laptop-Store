import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import "./Checkout.css"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios";
import Cookies from 'js-cookie';
import side from "../assets/sidecheck.png"
import { useEffect,useState } from 'react';
import {loadStripe} from "@stripe/stripe-js"

function Copyright() {
    return (
    <></>
    );
  }
  
  const steps = ['Shipping address', 'Review your order'];
  
const Checkout = ({shown,setshown}) => {
  const activeStepRef = React.useRef(0);
    const authToken = Cookies.get('email');
    const [product,setProduct]=useState();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isAddressValid, setIsAddressValid] = React.useState(false);
    const [isStripeCheckoutOpen, setIsStripeCheckoutOpen] = React.useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [orderedId,SetOrderedId]=useState('');
  const handleNext = () => {
    if (activeStep === 0) {
      const addressForm = document.getElementById('addressForm'); 
      if (addressForm.checkValidity()) {
        setIsAddressValid(true);
        setActiveStep(activeStep + 1);
      } else {
        addressForm.reportValidity();
      }
    } else if (activeStep === 1) {
      setIsStripeCheckoutOpen(true);
    }
}
  

  const handleBack = () => {
     setActiveStep(activeStep - 1);
  };
  
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext}/>;
      case 1:
        return  <Review />
      default:
        console.error('Unknown step:', step); 
      throw new Error('Unknown step');
    }
  }

  useEffect(() => {
    if(authToken)
    {
      console.log(authToken)
    axios.get(`http://localhost:8000/getcart/${authToken}`)
      .then((response) => {
        setProduct(response.data.cart.products)
        console.log('Response ',response)
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
    }else
    {
      setProduct([]);
    }
  }, [authToken]);

  const calculateSubtotal = (cartItem) => {
    return Number(cartItem.cost) || 0;
  };
  
  const calculateTotalSubtotal = () => {
    if (product && product.length > 0) {
      return product.reduce(
        (total, cartItem) => Number(total) + Number(calculateSubtotal(cartItem)),
        0
      );
    }
    return 0;
  }
  useEffect(() => {
    const stripePromise = loadStripe('pk_test_51OWY6hSAa0gR3mOK7tEkbjk0Of1mbFXg50SpEaBUngxlm11O8Dxua1FlGKQOJA9s2BOtAOyO3JxXSe83d9ASzSVI00IiMiis5n');

    stripePromise.then((stripe) => {
    });
  }, []);
  const totalAmount=calculateTotalSubtotal();
  const makePayment =async(token)=>
  {
    const data={
       token,totalAmount
    }
    try {
      console.log('Data:', data); 
      const response = await axios.post("http://localhost:8000/payment",data);
        if (response.data.success) {
            setIsPaymentSuccessful(true);
            SetOrderedId(response.data.paymentIntent.id)
            setActiveStep(activeStep + 1);

            const productID = [];
            product.forEach((item) => {
            productID.push(item.id);
            });
            await axios.delete('http://localhost:8000/deleteQuantity',{
              data: productID 
          }).then((response)=>console.log(response)).catch((error)=>console.log(error));
            
            await axios.delete(`http://localhost:8000/deleteItem/${authToken}`).then((response)=>console.log(response)).catch((error)=>console.log(error));
        }
  } catch (error) {
    console.log("Error:", error);
  }
  }
  return (
    <div className="full_cont">
         <img src={side}className="img_cont"/>
        <React.Fragment >
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }} className="checkout_cont">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
            <i class="fa-solid fa-bag-shopping mx-2" style={{color:"gray"}}></i>
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ?(
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your ordered id is {`${orderedId}`}. We have emailed your order
                confirmation to {`${authToken}`}, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                     Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  // onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  onClick={activeStep === steps.length - 1 ? makePayment : handleNext}
                  // style={{position:"absolute",marginTop:"-20px"}}
                >
                  {activeStep === steps.length - 1 ?<StripeCheckout
                  stripeKey='pk_test_51OWY6hSAa0gR3mOK7tEkbjk0Of1mbFXg50SpEaBUngxlm11O8Dxua1FlGKQOJA9s2BOtAOyO3JxXSe83d9ASzSVI00IiMiis5n'
                  token={makePayment}
                  name='Laptop' 
                  amount={`${calculateTotalSubtotal()*100}.00`}
                  currency='INR' 
                  >Place order</StripeCheckout>  : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
    </div>
  )
}

export default Checkout