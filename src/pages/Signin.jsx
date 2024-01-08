import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Signin.css"
import { Link,useNavigate} from "react-router-dom"
import Register from './Register';
import axios from 'axios';
import { useState } from 'react';
import {Form} from "react-bootstrap"
import { toast } from 'react-hot-toast'; 
import Cookies  from "js-cookie"


const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const[isSubmit,setIsSubmit]=useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [login,setLogin]=useState(
    {
    email:"",
    password:""
  }
  );
  const handleChange=(e)=>
  {
    setLogin({
      ...login,
      [e.target.name]:e.target.value
    });
    setErrorMessages({
      ...errorMessages,
      [e.target.name]: '',
    });
  }

  const handleSubmit =async (event) => {
    event.preventDefault();
    setValidated(validate(login));
    setIsSubmit(true);
    const errors = validate(login);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:8000/loginuser", login);
        console.log(response);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          console.log('authToken:', response.data.token); 
          // localStorage.clear();
          setLogin({});
          setUsername(response.data.name);
          const { role } = response.data.user;
          console.log('name '+role)
          Cookies.set('admin',role,{expires:20})
          toast.success("Logined Successfully ");
          Cookies.set('token', response.data.token, { expires: 20 });
          setIsLoggedIn(true);
          navigate('/'); 
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      setErrorMessages({
        email: errors.email || '',
        password: errors.password || ''
      });
    }
    setValidated(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!values.email) {
      errors.email = 'Email id is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be more than 6 characters';
    }
    console.log('Validation Errors:', errors); // Log errors to console
    return errors;
  };
  return (
    <>
      <Form action="POST" onSubmit={handleSubmit} noValidate >
        <div style={{marginTop:"80px"}}>
    <ThemeProvider theme={defaultTheme} >
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/premium-photo/e-commerce-online-shopping-digital-marketing-internet-business-technology-concept-virtual-screen_55997-2117.jpg?w=900)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }} 
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className="font_fam">
              Sign in
            </Typography>
          
            <Box sx={{ mt: 1 }} >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                aria-required
                value={login.email} onChange={handleChange}
              />
               <p className="error-message">{errorMessages.email}</p>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                aria-required
                value={login.password} onChange={handleChange}
              />
              <p className="error-message">{errorMessages.password}</p>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button className="font_fam"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>navigate() }
              >
                Sign In
              </Button>
              
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
    </Form>
    </>
  );
}