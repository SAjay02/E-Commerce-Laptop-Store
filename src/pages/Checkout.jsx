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

import side from "../assets/sidecheck.png"

function Copyright() {
    return (
    <></>
    );
  }
  
  const steps = ['Shipping address', 'Review your order'];
  
 
  

const Checkout = ({shown,setshown}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isAddressValid, setIsAddressValid] = React.useState(false);
    const [isStripeCheckoutOpen, setIsStripeCheckoutOpen] = React.useState(false);
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
    //setActiveStep(activeStep + 1);
}
  

  const handleBack = () => {
     setActiveStep(activeStep - 1);
  };
  
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext}/>;
      case 1:
        return  (
          <StripeCheckout>
            <Review />
          </StripeCheckout>
        );
      default:
        throw new Error('Unknown step');
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
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
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
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  // style={{position:"absolute",marginTop:"-20px"}}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
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