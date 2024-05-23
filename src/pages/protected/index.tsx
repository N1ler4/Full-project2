import { Navigate } from "react-router-dom";
import {isAunthenticated} from "../../utils/tokenService"
import {ProtectedRouterProps} from "@interface"

const Index = ({element}:ProtectedRouterProps)=>{
    return isAunthenticated()?<Navigate to="/main" /> : element
}

export default Index