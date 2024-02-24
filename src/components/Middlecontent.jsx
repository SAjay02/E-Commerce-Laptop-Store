import React from 'react'
import "./Middlecontent.css"
import {Card,Row} from "react-bootstrap"
import { useEffect,useState } from 'react'
import Allmiddlecontent from '../pages/Allmiddlecontent'
const img=[
    {
        img:"https://storage-asset.msi.com/event/2023/IN/nb-diwali/images/buy-tab-gaming.webp",
        name:"GAMING"
    },
    {
        img:"https://storage-asset.msi.com/event/2023/IN/nb-diwali/images/buy-tab-bp.webp",
        name:"BUSINESS"
    },
    {
        img:"https://storage-asset.msi.com/event/2023/IN/nb-diwali/images/buy-tab-cc.webp",
        name:"EDUCATION"
    }
]
const Middlecontent = () => {
    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
    
          // You can adjust the threshold based on your needs
          if (scrollY > 100) {
            document.getElementById('animatedElement').classList.add('animate');
          } else {
            document.getElementById('animatedElement').classList.remove('animate');
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      const [scaleDirection, setScaleDirection] = useState('scaleDown');
        useEffect(() => {
          const handleScroll = () => {
            const scrollTop = window.scrollY;
            const triggerPosition = window.innerHeight * 1.2; 
      
            if (scrollTop > triggerPosition && scaleDirection === 'scaleDown') {
              setScaleDirection('scaleUp');
            } else if (scrollTop <= triggerPosition && scaleDirection === 'scaleUp') {
              setScaleDirection('scaleDown');
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, [scaleDirection]);
  return (
    <>
    <div className="top_cont">

    <div className="head">
        <figure className="sub_head">
            <div className="head_tit">
        <h2 className="common_tit">up to 50% Discount!</h2>
        </div>
        <p className="cent_cont">Whether you’re buying a new laptop for studying, working or trying to find a high-end-gaming laptop,check out the best laptop deal here. We are not behind. Filter among of super-fast operating systems, hard disk capacity, RAM, lifestyle, screen size and many other criterias for personalized results in a flash. All you students out there, confused about what laptop to get? Our <span style={{color:"#0a0a0a "}}>Back To College Store </span>segregates laptops purpose with recommendations from top brands and industry experts, fascillitating a shopping experience that is quicker and simpler.</p>
    </figure>
    <div id='animatedElement' className="animated-content">
    <div className="img_head">
        <img className="img_head" src="https://storage-asset.msi.com/event/2023/IN/nb-diwali/images/dragon.webp"/>
    </div>
    </div>
    </div>
    
    <div className={`scale-animation ${scaleDirection} card__head_top`}>
        <Row>
        {img.map((map)=>
        {
            return(
                <>
                <div className="col-12 col-md-4">
                <div className="card_head">
                   
                <img src={map.img} className="midd_img" alt={map.img}/>
               
                    <div className="name_foot">
                <p className="name_foot">{map.name}</p>
                </div>
                </div>
                </div>
                </>
            )
        })}
        </Row>
    </div>
    </div>
    <Allmiddlecontent/>
    </>
  )
}

export default Middlecontent