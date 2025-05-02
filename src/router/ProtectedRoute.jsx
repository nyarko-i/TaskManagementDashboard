import { Navigate } from "react-router-dom";
import useAuthStore from "../context/authStore";  


const ProtectedRoute = ({children}) => {
    const {user} =useAuthStore();
    return user ? children : <Navigate to ="/"/> //redirect to login page
}; 

export default ProtectedRoute;