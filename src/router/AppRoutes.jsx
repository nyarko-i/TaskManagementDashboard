import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard"; 
import AdminDashboard from "../pages/AdminDashboard";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />  
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminDashboard/>
                    </ProtectedRoute>
                } /> 
            </Routes>
        </Router>
    );
};

export default AppRoutes;
