import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import Login from "../pages/Login";
import BasePage from "../pages/BasePage";
import Home from "../pages/Home";

import PrivateRoutes from "./PrivateRoutes";
import Quote from "../pages/Quote";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoutes />}>   
                    <Route path='/' element={<BasePage />}>
                        <Route index element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/cotacao" element={<Quote />} />
                    </Route>    
                </Route>     
                <Route path="/login" element={<Login />}/>
                
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;