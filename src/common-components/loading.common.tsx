import {useMemo} from "react";
import "./scss/loading.common.scss";
const LoadingCommon = () => {
    const divStyles = useMemo(() => {
        return {top: 0, left: 0, zIndex: 1000}
    }, [])
    const imgStyles = useMemo(() => {
        return {
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
           zIndex:999
        }
    }, [])
    return (
        <div className="vw-100 vh-100 position-fixed wrapper-loading" style={divStyles}>
            <img src="media/earth-loading.svg" alt="" className="position-absolute"
                 style={imgStyles}/>
        </div>
    )
};

export default LoadingCommon;