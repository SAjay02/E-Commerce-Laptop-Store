import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { CallToAction } from '@mui/icons-material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [revenue,setRevenue]=useState([]);
  useEffect(()=>
{
  axios.get('http://localhost:8000/api/getrevenue').then((response)=>setRevenue(response.data)).catch((err)=>console.log(err));
},[])
const calculateSubtotal = (cartItem) => {
  return Number(cartItem.Amount) || 0;
};

const calculateTotalSubtotal = () => {
  if (revenue && revenue.length > 0) {
    return revenue.reduce(
      (total, cartItem) => Number(total) + Number(calculateSubtotal(cartItem)),
      0
    );
  }
  return 0;
}
console.log(revenue);
  return (
    <React.Fragment>
      <Title>Total Revenue's</Title>
      <Typography component="p" variant="h4">
        {/* $3,024.00 */}
        {`${calculateTotalSubtotal()}.00`}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Sice 09 Dec, 2023
      </Typography>
      <div>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
}