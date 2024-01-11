import React from 'react'
import { Row,Col } from 'react-bootstrap'
import "./Upfotter.css"
const Upfotter = () => {
  return (
        <div className="upfoo_head ">
            <div className="row head_one">
                    <div className="col-md-6 col-sm-12">
                    <div className="left_cont ">
                        <p>Enter Email to receive valuable updates</p>
                        <input type="email" placeholder="Email" className="input_cont"></input>
                        <i class="fa-solid fa-arrow-right arrow_cont" ></i>
                    </div>
                    </div>
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