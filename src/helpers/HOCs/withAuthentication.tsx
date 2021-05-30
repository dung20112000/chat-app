import React  from "react";
import {Redirect} from "react-router-dom";
const withAuthentication = (WrappedComponent:React.ComponentType<any>) => {
    const WithAuthentication:React.FC<any> = (props:any)=>{
        if (!localStorage.getItem("authToken")){
            return <Redirect  to="/authentication/login"/>
        }
        return <WrappedComponent {...props}/>
    }
    return WithAuthentication;
}
export default withAuthentication;