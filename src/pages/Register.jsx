import React from 'react';
import { useNavigate} from "react-router-dom"
import { useState,useEffect } from 'react';
import "./Register.css";
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import {toast} from "react-hot-toast"

const Register = () => {

  const[isSubmit,setIsSubmit]=useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const navigate=useNavigate();
  const [color, setColor] = useState("#00806B"); 

  const [register,setRegister]=useState(
    {
    name:"",
    email:"",
    password:"",
    confirm_password:""
  }
  );
  
  const handleChange=(e)=>
  {
    setRegister({
      ...register,
      [e.target.name]:e.target.value
    })
    setErrorMessages({
      ...errorMessages,
      [e.target.name]: '',
    });
  }
  
  const handleSubmit=async(event)=>
  {
    event.preventDefault();
    setValidated(validate(register));
    setIsSubmit(true);
    const errors = validate(register);
    // try
    // {
    //     console.log('Form Data:', register); 
    //     const response=axios.post("http://localhost:8000/register",register).then((response)=>console.log(response)).catch((error)=>console.log(error));
        
    // if(response.data.error)
    // {
    //   toast.error(response.data.error)
    // }
    // else{
    //   setRegister({});
    //   toast.success("Registration Successfully Completed");
    //   navigate('/login')
    // }
    // } 
    // catch(event){
    //   console.log("Error:"+event);
    // }
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:8000/register", register);
        console.log(response);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setRegister({});
          toast.success("Registration Successfully Completed");
          navigate('/login');
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      setErrorMessages({
        name: errors.name || '',
        email: errors.email || '',
        password: errors.password || '',
        confirm_password: errors.confirm_password || '',
      });
    }
    setValidated(true);
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!values.name) {
      errors.name = 'Name is required!';
    }
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
    if (!values.confirm_password) {
      errors.confirm_password = ' password is required!';
    } else if (values.confirm_password.length < 6) {
      errors.confirm_password = 'Password must be more than 6 characters';
    }
    else if (values.password !== values.confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }
    console.log('Validation Errors:', errors); // Log errors to console
    return errors;
  };
  
    console.log(register);
  return (
    <div className="container " style={{marginTop:"120px"}}>
<Container>
        <Row className="mt-5 d-flex justify-content-center align-items-center font_clr">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h4 className="fw-bold mb-2 text-center text-uppercase ">
                  <i className="fa fa-user-plus me-1"></i>Register
                  </h4>
                  <div className="mb-3">
                    <Form action="" onSubmit={handleSubmit} noValidate>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <p className="error-message">{errorMessages.name}</p>
                        <Form.Control type="text" placeholder="Enter Name" value={register.name} onChange={handleChange} name="name" required/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <p className="error-message">{errorMessages.email}</p>
                        <Form.Control type="email" placeholder="Enter email" value={register.email} onChange={handleChange} name="email" required/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        {/* <Row>
                          <Col sm={10} > */}
                        <Form.Label>Password</Form.Label>
                        <p className="error-message">{errorMessages.password}</p>
                        <Form.Control type="password" placeholder="Password" value={register.password} onChange={handleChange} name="password" required/>
                        </Form.Group>

                        {/* </Col>
                        <Col sm={10} > */}
                        <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <p className="error-message">{errorMessages.confirm_password}</p>
                        <Form.Control type="password" placeholder="Password" value={register.confirm_password} onChange={handleChange} name="confirm_password" required/>
                        {/* </Col>
                        </Row> */}
                        <Form.Group/>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" style={{backgroundColor:`${color}`,marginTop:"10px"}} onClick={()=>navigate('')}>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    {/* {errorText && <p className="error-message">{errorText}</p>} */}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  )
}
// 
export default Register