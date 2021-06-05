import {Row, Col, Container} from "react-bootstrap";

interface IFilesFolder {
    icon: () => React.ReactNode,
    label: string,
    filesQuantity: number
}
const FilesFolder:React.FC<IFilesFolder> = ({icon, label, filesQuantity}) => {
    return (
        <Row className="align-items-center">
            <Col xs={3}>
                <div className="rounded-circle w-100 position-relative bg-secondary" style={{paddingTop:"100%"}}>
                    <div className="position-absolute" style={{fontSize:"1.7rem",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
                        {icon()}
                    </div>
                </div>
            </Col>
            <Col xs={8} className="pl-0">
                <div>
                    <h6 className="text-muted mb-0">{label}</h6>
                    <h5>
                        <strong>{filesQuantity} files </strong>
                    </h5>
                </div>
            </Col>
            <Col xs={1}>
                <button className="btn"><i className="fas fa-chevron-right"/></button>
            </Col>
        </Row>
    )
}
const RightSideChatFiles = () => {
    return  (
        <Container fluid>
            <Row>
                <Col xs={12} className="pr-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Chat files</h5>
                        <button className="btn p-0" type="button"><i className="fas fa-caret-down"/></button>
                    </div>
                </Col>
                <Col xs={12}>
                    <FilesFolder icon={() => <i className="far fa-file-word"/>} label="Documents" filesQuantity={3} />
                </Col>
            </Row>
        </Container>
    )
}
export default RightSideChatFiles;