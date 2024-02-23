import * as React from 'react';
import { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Button, Form} from "react-bootstrap"
import axios from 'axios';
import Cookies from 'js-cookie';
import "./AddressForm.css"
import Checkout from '../pages/Checkout';
import {toast} from "react-hot-toast"
const errors = {};
const AddressForm = ({ handleNext}) => {

  const[display,SetDisplay]=useState(false);
  const[isSubmit,setIsSubmit]=useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
      firstName:"",
      lastName:"",
      address:"",
      city:"",
      state:"",
      zip:"",
      country:""
  });

  const email=Cookies.get('email');
  const [checkout,SetCheckout]=useState(
    {
      firstName:"",
      lastName:"",
      address:"",
      city:"",
      state:"",
      zip:"",
      country:""
    })
  const handleChange=(e)=>
  {
    SetCheckout({
      ...checkout,
      [e.target.name]:e.target.value
    });
  }
  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    setValidated(validate(checkout));
    setIsSubmit(true);
    const errors = validate(checkout);
    if (Object.keys(errors).length === 0) {
      SetDisplay(true);
      toast.success('Address Added');
      
    const data = {
      authToken: email, // This should be the user's authentication token
      userAddress: checkout, // The ID of the product you want to add to the cart
    };
    try {
        console.log('Data:', data); 
        axios.post("https://e-com-back.onrender.com/useraddress",data).then((response)=>console.log(response)).catch((error)=>console.log(error));
        handleNext();
    } catch (error) {
      console.log("Error:", error);
    }
    
  }
  else {
    setErrorMessages({
      firstName: errors.firstName || '',
      lastName: errors.lastName || '',
      address: errors.address || '',
      city: errors.city || '',
      state: errors.state || '',
      zip: errors.zip || '',
      country: errors.country || '',
    });
  }
  setValidated(true);
  }
  
  const validate = (values) => {
   
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!values.firstName) {
      errors.firstName = 'Name is required!';
    }
    if (!values.lastName) {
      errors.lastName = 'Name is required!';
    } 
    if (!values.address) {
      errors.address = 'Address is required!';
    } 
    if (!values.city) {
      errors.city = 'City is required!';
    } 
    if (!values.state) {
      errors.state = 'State is required!';
    } 
    if (!values.zip) {
      errors.zip = 'Zip is required!';
    } 
    if (!values.country) {
      errors.country = 'Country is required!';
    } 
    console.log('Validation Errors:', errors); // Log errors to console
    return errors;
  };

  return (
    <div>
      {/* {display && <Checkout shown={display} setshown={SetDisplay}/>} */}
         <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
        <i class="fa-solid fa-address-card mx-2" style={{color:"grey"}}></i>
      </Typography>
      {Object.keys(errors).length !== 0 && 
      <p className="error-message2">All field is required!</p>}
      <Form action="POST" id="addressForm" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={checkout.firstName}
            onChange={handleChange}
          />
          {/* <p className="error-message">{errorMessages.firstName}</p> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={checkout.lastName}
            onChange={handleChange}
          />
        </Grid>
        {/* <p className="error-message2">{errorMessages.lastName}</p> */}
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address"
            variant="standard"
            value={checkout.address}
            onChange={handleChange}
          />
        </Grid>
        {/* <p className="error-message">{errorMessages.address}</p> */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={checkout.city}
            onChange={handleChange}
          />
        </Grid>
        {/* <p className="error-message">{errorMessages.city}</p> */}
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={checkout.state}
            onChange={handleChange}
          />
        </Grid>
        {/* <p className="error-message">{errorMessages.state}</p> */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={checkout.zip}
            onChange={handleChange}
          />
        </Grid>
        {/* <p className="error-message">{errorMessages.zip}</p> */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={checkout.country}
            onChange={handleChange}
          />
         
        </Grid>
        <p className="note_Cont"><Typography><span style={{fontWeight:"900"}}>Note:</span> [Please submit first then click next button!]</Typography></p> 
          <Grid item xs={12} sm={6}>
              <Button type="submit" sx={{ mt: 3, mb: 2 }} className="address_sub_btn">
                Submit
              </Button>
          </Grid>
      </Grid>
      </Form>
    </React.Fragment>
    </div>
  )
}

export default AddressForm