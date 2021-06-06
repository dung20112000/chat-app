import React from "react";
interface IPropsComponentTitleCommon {
    title: string;
}
const ComponentTitleCommon:React.FC<IPropsComponentTitleCommon> = ({title})=>{
    return <h5 className="mb-0 mr-2"><strong>{title}</strong></h5>
}
export default ComponentTitleCommon