import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { Navigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext);
    if(loading){
       return <div><Skeleton count={15} /></div>
    }
 
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    else{
        return children;
    }
};

export default PrivateRoute;