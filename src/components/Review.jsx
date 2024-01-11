import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useEffect,useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import "./Review.css"

const Review = () => {
  const authToken = Cookies.get('email');
  const [updateaddress,setUpdateAddress]=useState([]);
  const [lastAddress, setLastAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const [product,setProduct]=useState();

  useEffect(()=>
  {
    axios.get(`http://localhost:8000/getaddress/${authToken}`)
    .then((response)=>
    {
      setUpdateAddress(response.data[0].userAddress);
    })
    .catch((error) => {
      console.error('Error fetching cart items:', error);
    });
  },[authToken]);

  useEffect(() => {
    if (updateaddress && updateaddress.length > 0) {
      const lastAddressData = updateaddress[updateaddress.length - 1];
      setLastAddress(lastAddressData);
      setLoading(false); 
    }
  }, [updateaddress]);

    console.log(lastAddress);
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

  return (
    <div>
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
      {product && product.map((product) => (
    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
      <ListItemText primary={product.name} secondary={product.desc} />
      <Typography variant="body2">{product.price}</Typography>
    </ListItem>
  ))}  
         <ListItem sx={{ py: 1, px: 0 }}>
         <Typography variant="h6" gutterBottom>
        Total
        </Typography>
         <div  className="total_icon">
         <i className=" fa-sharp fa-solid fa-indian-rupee-sign fa-xs rup_subtot" ></i>
         {`${calculateTotalSubtotal()}.00`}
         </div>
         </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
           {Object.keys(lastAddress).length > 0 ? (
              <React.Fragment>
                <Typography gutterBottom>{lastAddress.firstName},</Typography>
                <Typography gutterBottom>{lastAddress.address},</Typography>
                <Typography gutterBottom>{lastAddress.city}   {lastAddress.state},</Typography>
                <Typography gutterBottom>{lastAddress.zip}  {lastAddress.country}.</Typography>
              </React.Fragment>
            ) : (
              <Typography gutterBottom>No shipping address available.</Typography>
            )}
        </Grid>
      </Grid>
    </React.Fragment>
    </div>
  )
}

export default Review