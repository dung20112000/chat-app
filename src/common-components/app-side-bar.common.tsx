import {Link, useRouteMatch} from "react-router-dom";
import React from "react";
import "./scss/app-side-bar.common.scss";

const links = [
    {
        to: "/chat-page/conversations",
        label: () => <i className="fas fa-comment-dots"/>,
        exact: false,
        strict: true
    },
    {
        to: "/chat-page/contacts",
        label: () => <i className="fas fa-address-book"/>,
        exact: false,
        strict: true
    },
]

const CustomLink = ({
                        label,
                        to,
                        exact,
                        strict
                    }: { label: () => React.ReactNode, to: string, exact: boolean, strict: boolean }) => {
    const match = useRouteMatch({
        path: to,
        exact,
        strict
    })
    return (
        <div className={match ? "wrapper-link active-link px-2 my-3" : "wrapper-link px-2 my-3"}>
            <Link className="d-flex align-items-center justify-content-sm-center w-100 py-2 rounded text-white text-decoration-none" to={to}>{label()}</Link>
        </div>
    )
}
const AppSideBarCommon = () => {
    return (
        <div className="position-fixed app-side-bar vh-100 bg-primary text-white">
            {
                links && links.length > 0 ? (
                    links.map((link, index) => {
                        return <CustomLink key={index} {...link}/>
                    })
                ) : null
            }
        </div>
    )
}
export default AppSideBarCommon;