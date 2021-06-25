import {Row,Col} from "react-bootstrap";
import * as Yup from "yup";
import {useFormik} from "formik";

interface IValues {
    field: string | number
}
const ForgetPassword = () => {
    const initialValues: IValues  = {
        field: "",
    }

    const onSubmit = (values: any) => {
        console.log(values)
    }
    const validationSchema = Yup.object({
    })
    const formik = useFormik({
        initialValues,onSubmit,validationSchema
    })
    return (
        <Row className="text-center">
            <Col xs={12} className="pb-2">
                <i style={{fontSize:"2.5rem"}} className="fas fa-user-lock"/>
            </Col>
            <Col xs={12} className="pb-2">
                <h4>Trouble Logging In?</h4>
            </Col>
            <Col xs={12}>
                <p style={{fontSize:"1.2rem"}} className="w-75 mx-auto text-muted">Enter your email or phone and we will send you a link to get back into your account.</p>
            </Col>
        </Row>
    )
}
export default  ForgetPassword;