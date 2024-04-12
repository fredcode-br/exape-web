import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../common/contexts/authContext";


const PrivateRoutes = () => {
    const { signed } = useContext(AuthContext);

    return (
        signed ? <Outlet /> : <Navigate to="/login" /> 
    )
}

export default PrivateRoutes;