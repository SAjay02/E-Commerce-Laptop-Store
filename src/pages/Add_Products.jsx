import React from 'react'
import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import "./Add_Products.css"
const Add_Products = () => {
  const [color, setColor] = useState("#00806B");
  const [validated, setValidated] = useState(false);
  const [product,setProduct]=useState(
    {
    name:"",
    id:"",
    description:"",
    quantity:"",
    cost:""
  }
  );
  const handleChange=(e)=>
  {
    setProduct({
      ...product,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=(event)=>
  {
    event.preventDefault();
    try
    {
        console.log('Form Data:', product); 
        axios.post("https://e-com-back.onrender.com/",product).then((response)=>console.log(response)).catch((error)=>console.log(error));
    } 
    catch(event){
      console.log("Error:"+event);
    }
    setValidated(true);
  }

  return (
    <div className="">
    <div  className="container  mb-5 " style={{marginTop:"130px"}}>
      <Row>
        <Col className="col-sm-12">
              <Card>
                  <Card.Body className="" >
                      <Form action="POST" onSubmit={handleSubmit} noValidate validated={validated}>
                      <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                      <Row>
                   <Col sm={10} lg={6} className=" mt-1">
                      <Form.Label className="font_clr">Laptop Name</Form.Label>
                   <Form.Control type="text" placeholder="Enter Name" value={product.name} onChange={handleChange} name="name" required/>
                   </Col>
                   <Col sm={10} lg={6}>
                          <Form.Label column className="font_clr">Laptop Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter Id" value={product.id} onChange={handleChange} name="id" required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-4" as={Row}>
                        <Row>
                          <Col>
                          <Form.Label column className="font_clr">Description</Form.Label>
                          <Form.Control type="text" placeholder="Laptop Description" value={product.description}onChange={handleChange} name="description" required/>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-4" as={Row}>
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column className="font_clr">Laptop Quantity</Form.Label>
                            <Form.Control type="text" placeholder="Enter Quantity" value={product.quantity}onChange={handleChange} name="quantity" required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column className="font_clr">Laptop Cost</Form.Label>
                          <Form.Control type="text" placeholder="Enter Cost" value={product.cost} onChange={handleChange} name="cost" required/>
                        </Col>
                        </Row>
                      </Form.Group>
                      <div className="text-center font_clr">
                      <Button style={{backgroundColor:`${color}`}} type="submit">Submit</Button>
                      </div>
                      </Form>
                  </Card.Body>
              </Card>
        </Col>
      </Row>
    </div>
    </div>
  )
}

export default Add_Products