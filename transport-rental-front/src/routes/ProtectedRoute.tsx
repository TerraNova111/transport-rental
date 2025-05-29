import {JSX} from "react";
import {getRoleFromToken} from "../utils/auth";
import {Navigate} from "react-router-dom";

interface Props {
    children: JSX.Element;
    role?: string;
}

const ProtectedRoute = ({ children,role }: Props) => {
    const token = localStorage.getItem("token");
    const userRole = getRoleFromToken();

    if(!token) return <Navigate to={"/login"}/>
    if (userRole && role !== role) {
        return <Navigate to={"/unauthorized"}/>
    }

    return children;
}

export default ProtectedRoute;