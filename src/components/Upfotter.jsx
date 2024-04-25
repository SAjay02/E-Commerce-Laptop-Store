import React, { useState } from 'react'
import { Row,Col,Form } from 'react-bootstrap'
import toast from "react-hot-toast"
import emailjs from '@emailjs/browser';
import "./Upfotter.css"
import Cookies from 'js-cookie';

const Upfotter = () => {
        const [email,setEmail]=useState('');
        const authToken = Cookies.get('email');
        const handleSubmit=(e)=>
        {
           e.preventDefault(); 
           setEmail('');
           toast.success("Mail Sent Successfully");

           const serviceId = 'service_pezcy9z';
           const templateId = 'template_1bevlzm';
           const publicKey = '1UdyIvKr90_b45YSS';

           const object = {
                from_name:'User',
                from_mail:email,
                to_name:'Admin',
                message:"Send valuable updates to my mail"
           }

           //send mail to admin
           emailjs.send(serviceId, templateId, object, publicKey)
           .then((result) => {
               console.log(result.text);
           }, (error) => {
               console.log(error.text);
           });
       };
       const handleSubmit1=(e)=>
        {
           e.preventDefault(); 
           setEmail('');
           toast.error("Please Login");

       };
        
  return (
        <div className="upfoo_head ">
            <div className="row head_one">
                {
                    authToken ?
                    <div className="col-md-6 col-sm-12">
                    <div className="left_cont ">
                        <Form action="" onSubmit={handleSubmit}>
                        <p>Enter Email to receive valuable updates</p>
                        <input type="email" placeholder="Email" className="input_cont" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <button  type="submit"><i class="fa-solid fa-arrow-right arrow_cont"></i></button>
                        </Form>
                    </div>
                    </div>
                    :
                    <div className="col-md-6 col-sm-12">
                    <div className="left_cont ">
                        <Form action="" onSubmit={handleSubmit1}>
                        <p>Enter Email to receive valuable updates</p>
                        <input type="email" placeholder="Email" className="input_cont" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <button  type="submit"><i class="fa-solid fa-arrow-right arrow_cont"></i></button>
                        </Form>
                    </div>
                    </div>
                }
                    <div  className=" col-md-6 col-sm-12">
                    <div className="right_cont">
                    <a href=""><i class="fa-brands fa-facebook fb_cont"></i></a>
                    <a href="https://www.linkedin.com/in/ajay-s-18a7b5245/"><i class="fa-brands fa-linkedin lnk_cont"></i></a>
                    <a><i class="fa-brands fa-square-instagram inst_cont"></i></a>
                    <p className="right_cont_last">Country / Region: <span className="last_cont">INDIA</span></p>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row head_two">
            <div className="col-md-3">
                    <div className="left_cont_one ">
                       <p className="common_cont">HELP</p> 
                       <div className="common_subcont">
                            <p>Payments</p>
                            <p>Shipping</p>
                            <p>Cancellation &</p>
                            <p>Returns</p>
                            <p>FAQ</p>
                       </div>
                    </div>
            </div>
            <div className="col-md-3">
                    <div className="left_cont_two ">
                      <p className="common_cont">CONSUMER POLICY</p> 
                      <div className="common_subcont">
                            <p>Cancellation &</p>
                            <p>Returns</p>
                            <p>Security</p>
                            <p>Privacy</p>
                            <p>Sitemap</p>
                       </div> 
                    </div>
            </div>
            {/* <span>|</span> */}
            <div className="col-md-3">
                    <div className="right_cont_one ">
                       <p className="common_cont">Mail Us:</p>
                       <div className="common_subcont">
                            <p>Lapii.Store Limited,</p>
                            <p>Thillai Nagar Senthangudi,</p>
                            <p>Pommbukar Main Road,</p>
                            <p>Mayiladuthurai, 609001,</p>
                            <p>Tamilnadu, India</p>
                       </div>
                    </div>
            </div>
            <div className="col-md-3">
                    <div className="right_cont_two ">
                        <p className="common_cont">Office Address:</p>
                        <div className="common_subcont">
                            <p>Lapii.Store Limited,</p>
                            <p>Thillai Nagar Senthangudi,</p>
                            <p>Pommbukar Main Road,</p>
                            <p>Mayiladuthurai, 609001,</p>
                            <p>Tamilnadu, India</p>
                            <p>Phone Number: 9600399818</p>
                       </div>
                    </div>
            </div>
            </div>
        </div>
  
  )
}

export default Upfotter