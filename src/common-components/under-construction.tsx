import { Row, Col } from "react-bootstrap";
import "./scss/under-construction.scss";

const imgUrl = "https://res.cloudinary.com/fptssss/image/upload/v1624957730/upload-image-fpt/do1zkhylc0nrwlaexcer.svg";

export const UnderConstruction = () => {

    return (
        <Row>
            <Col xs={12}>
                <div className="under-construction">
                    <img src={imgUrl} alt="" />
                </div>
            </Col>
        </Row>

    )
}