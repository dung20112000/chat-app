import {Carousel} from "react-bootstrap";

const ChatAreaWelcomePage = ()=>{
    return (
           <Carousel className="px-0">
               <Carousel.Item interval={5*1000}>
                   <img
                       className="d-block w-100 rounded-1rem"
                       src="https://addons-media.operacdn.com/media/CACHE/images/themes/05/144705/1.0-rev1/images/0993404e-79e0-4052-923d-89236e7c102f/ce42ef837a89c852c000eafd63cd0763.jpg"
                       alt="First slide"
                       style={{height:"95vh"}}
                   />
                   <Carousel.Caption>
                       <h3>First slide label</h3>
                       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                   </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item className="text-dark" interval={5*1000}>
                   <Carousel.Caption>
                       <h3>Second slide label</h3>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                   </Carousel.Caption>
                   <img
                       className="d-block w-100 rounded-1rem"
                       src="https://addons-media.operacdn.com/media/CACHE/images/themes/05/144705/1.0-rev1/images/0993404e-79e0-4052-923d-89236e7c102f/ce42ef837a89c852c000eafd63cd0763.jpg"
                       alt="Second slide"
                       style={{height:"95vh"}}
                   />
                   <Carousel.Caption>
                       <h3>Second slide label</h3>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                   </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item interval={5*1000}>
                   <img
                       className="d-block w-100 rounded-1rem"
                       src="https://addons-media.operacdn.com/media/CACHE/images/themes/05/144705/1.0-rev1/images/0993404e-79e0-4052-923d-89236e7c102f/ce42ef837a89c852c000eafd63cd0763.jpg"
                       alt="Third slide"
                       style={{height:"95vh"}}
                   />

                   <Carousel.Caption>
                       <h3>Third slide label</h3>
                       <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                   </Carousel.Caption>
               </Carousel.Item>
           </Carousel>
    )
}
export default ChatAreaWelcomePage;