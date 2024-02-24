import React from 'react'
import "./LastmidCont.css";
import { useEffect,useState } from 'react';
import {Row,Col} from "react-bootstrap"
const LastmidCont = () => {
    const [isVisibletop ,setIsVisibletop]=useState(false);
    useEffect(() => {
        // Trigger the animation after the component has mounted
        
        setIsVisibletop(true);
      }, []);
  return (
    <div className={`fade-in-from-top ${isVisibletop ? 'visible' : ''}`}>
    <div className='top'>
        <div className="top_img">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/gaminglap/revamp/gaming_subsection_pc_01.jpg" className="top_img"/>
        </div>
        <div style={{display:"flex",backgroundColor:"black"}} >
            <Row>
            <Col className=" col-md-4 img_one">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/gaminglap/revamp/gaming_subsection_pc_02.jpg" style={{height:"421px",width:"421px"}}/>
            </Col>
            <Col className=" col-md-4 img_one">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/gaminglap/revamp/gaming_subsection_pc_03.jpg" style={{height:"421px",width:"421px"}}/>
            </Col>
            <Col className=" col-md-4 img_one">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/gaminglap/revamp/gaming_subsection_pc_04.jpg" style={{height:"421px",width:"421px"}}/>
            </Col>
            </Row>
        </div>
    </div>
    </div>
  )
}

export default LastmidCont