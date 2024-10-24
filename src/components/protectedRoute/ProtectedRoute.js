import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Spinner from "../spinner/Spinner";

const ProtectedRoute = ({ roles, children }) => {
    const { role, isLoading } = useSelector(state => ({
        role: state.role,
        isLoading: state.isLoading
    }));

    if (isLoading) {
        return <div className="section wrapper"><Spinner/></div>;
    }

    if (roles.includes(role)) { 
        return children;
    }

    return <Navigate to="/login" />;
};


export default ProtectedRoute;
