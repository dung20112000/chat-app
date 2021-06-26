import {Col, Row} from "react-bootstrap";
import Slider from "react-slick";
import React from "react";
import {Avatar} from "../../../../../common-components/avatar.common";
import {slideFriendSuggest} from "./suggest-slide";

interface ISlideShowFriendSuggest {
    avatarUrl: string,
    firstName: string,
    lastName: string,
}

const SlideShowFriendSuggest:React.FC<ISlideShowFriendSuggest> = ({firstName,lastName,avatarUrl}) => {
    return (
        <div>
            <Row className="text-center bg-white align-items-center rounded-1rem">
                <Col xs={12}>
                    <div className="d-flex justify-content-center align-items-center w-25 mx-auto" >
                        <Avatar avatarUrl={avatarUrl} alt={firstName}/>
                    </div>
                </Col>
                <Col xs={12}>
                    <div>
                        <h3 className="pt-2 text-truncate">{firstName} {lastName}</h3>
                    </div>
                </Col>
                <Col xs={12}>
                    <div className="text-muted mb-2" style={{fontSize: "1.2rem"}}>
                        <p className="mb-0">From friend suggestion </p>
                    </div>
                </Col>
                <Col xs={12}>
                    <button className="btn btn-primary mb-2">
                        ADD FRIEND
                    </button>
                </Col>
            </Row>
        </div>
    )
}
const RightSideSlideShow = ()=> {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
    };

    return (
        <Row>
            <Col xs={12}>
                <div>
                    <Slider {...settings}>
                        {
                            slideFriendSuggest.map((slide: any,index) => {
                                return <SlideShowFriendSuggest {...slide} key={index} />
                            })
                        }
                    </Slider>
                </div>
            </Col>
        </Row>
    );
}
export default RightSideSlideShow;

