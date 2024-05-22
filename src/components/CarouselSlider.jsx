import React from 'react'
import img1 from "../assets/Caro_Img.jpg"
import img2 from "../assets/Caro_Img1.jpg"
import {Carousel} from "react-bootstrap"
import "./CarouselSlider.css"
import Middlecontent from './Middlecontent'
const CarouselSlider = () => {
    let carousel = [
        {
          id : 1,
          image : img1
        },
        {
          id : 2,
          image : img2
        },
        {
          id:3,
          image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D"
        }
      ]
  return (
    <div>
  <div className="container__">
    <Carousel >
          {
            carousel.map(carousel =>{
              return(
                <Carousel.Item key={carousel.id} interval={3000}>
                <img
                    className='d-block w-100 '
                    src={carousel.image}
                    alt={carousel.id}
                    style={{maxHeight:"530px",maxWidth:"5000px",borderRadius:"3px"}}
                />
              </Carousel.Item>
              )
            })
          }
        </Carousel>
        {/* <StickyFooter/> */}
        </div>
         <Middlecontent/>
         </div>
  )
}

export default CarouselSlider