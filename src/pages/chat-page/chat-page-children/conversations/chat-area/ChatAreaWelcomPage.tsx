import Slider from "react-slick"
import {Row,Col} from "react-bootstrap";
import React from "react";
import {slidesData} from "./welcome-slides"

interface ISlide {
    imageUrl: string,
    title: string,
    description: string
}
const Slide:React.FC<ISlide> = ({imageUrl,title,description}) => {
    return (
        <Row className="p-5 pb-0 text-center">
            <Col xs={12} className="mb-3">
                <h2 className="mb-3">Welcome to Open Messenger</h2>
                <p className="w-75 mx-auto">Explore the best features to support your work and allow you to chat with your friends and family.
                    All are optimized for your computer! </p>
            </Col>
            <Col xs={12} className="mb-5">
                <div style={{height:"45vh"}}>
                    <img src={imageUrl} alt="Welcome" className="mh-100 mx-auto"/>
                </div>
            </Col>
            <Col xs={12}>
                <h4 className="mb-3 text-primary">{title}</h4>
                <p>{description}</p>
            </Col>
        </Row>
    )
}
const ChatAreaWelcomePage = ()=> {
    const settings = {
        arrows:false,
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
       <Row>
           <Col xs={12}>
               <div>
                   <Slider {...settings}>
                       {
                           slidesData.map((slide: any,index) => {
                               return <Slide key={index}  {...slide}/>
                           })
                       }
                   </Slider>
               </div>
           </Col>
       </Row>
    );
}

export default ChatAreaWelcomePage;