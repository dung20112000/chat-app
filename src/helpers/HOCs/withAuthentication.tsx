import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {callApi} from "../../server-interaction/apis/api.services";

const withAuthentication = (WrappedComponent: React.ComponentType<any>) => {
    const WithAuthentication: React.FC<any> = (props: any) => {
        const [tokenValid, setTokenValid] = useState<boolean | undefined>(undefined);
        useEffect(() => {
            if (localStorage.getItem("authToken")) {
                callApi("/validate-token", "POST", {authToken: `Bearer ${JSON.parse(localStorage.getItem("authToken") as string)}`})
                    .then((response) => {
                    if (response.status === 200) {
                        setTokenValid(true)
                    }
                }).catch((errors)=>{
                    if (errors){
                        setTokenValid(false)
                    }
                })
            }
        }, [])
        if (!localStorage.getItem("authToken")) {
            return <Redirect to="/authenticate/login"/>
        }
        if (tokenValid === undefined) {
            return <p>Loading...</p>;
        }
        if (tokenValid === false) {
            return <Redirect to="/authenticate/login"/>
        }
        return <WrappedComponent {...props}/>
    }
    return WithAuthentication;
}
export default withAuthentication;