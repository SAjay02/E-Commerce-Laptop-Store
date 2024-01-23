import * as React from 'react';
import Link from '@mui/material/Link';
// import Table from '@mui/material/Table';
import {Table} from "react-bootstrap"
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState,useEffect } from 'react';
import axios from 'axios';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
  
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  const [order,setOrder]=useState([]);

  useEffect(()=>
  { 
    axios.get('http://localhost:8000/api/recentOrders').then(items=>setOrder(items.data)).catch(err=>console.log(err));
  },[]);
  console.log(order);
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <div className="table-responsive">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            order.map((row)=>
            {
              return (
                <>
                 <TableRow >
                 <TableCell>{row.Date}</TableCell>
                 <TableCell>{row.Name}</TableCell>
                 <TableCell>{row.City}, {row.State}</TableCell>
                 <TableCell>{row.Payment}   ****{row.LastDigits}</TableCell>
                 <TableCell align="right">{`Rs.${row.Amount}`}</TableCell>
                 </TableRow></>
              )
            })
          }
        </TableBody>
      </Table>
      </div>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}