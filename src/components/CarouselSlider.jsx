import React from 'react'
import img1 from "../assets/Caro_Img.jpg"
import img2 from "../assets/Caro_Img1.jpg"
import {Carousel} from "react-bootstrap"
import "./CarouselSlider.css"
import Middlecontent from './Middlecontent'
import StickyFooter from './Footer'
const CarouselSlider = () => {
    let carousel = [
        {
          id : 1,
          image : img1
        },
        {
          id : 2,
          image : img2
        }
      ]
  return (
    <>
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
         </>
  )
}

export default CarouselSlider