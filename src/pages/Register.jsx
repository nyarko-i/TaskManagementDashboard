import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../context/authStore';



const Register = () => {
    const navigate = useNavigate(); // enables navigation after registration
    const {login} = useAuthStore();  
    // state variables top store user inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("user")

    const handleRegister = () => {
        // basic validation for empty fields and password strength
        if (!firstName || !lastName ||!email || password.length < 6 ){
            alert("All fields are required & password must be at least 6 characters");
            return;
        }
        const newUser = {
            firstName,
            lastName,
            email,
            role, //User selected role (admin or User)
        };
        // store user info in local storage for persistence
        localStorage.setItem("user", JSON.stringify(newUser));

        //log the user in and redirect to the dashboard 
        login(newUser);
        navigate("/dashboard")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100">
            <div className="flex flex-col bg-white p-8 rounded shadow-md w-full max-w-md">

            <h2 className="text-2xl font-bold mb-4 text-center">Task Management App</h2>

                <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Registration Page</h2>

                <label htmlFor="first Name"className='self-start mb-1 text-gray-700' >First Name</label>
                <input onChange={(e)=>setFirstName(e.target.value)} className="border p-2 mb-2 w-full rounded" type="text" name="first Name" placeholder="Kwame" />

                <label htmlFor="Last Name"  className='self-start mb-1 text-gray-700'>Last Name</label>
                <input onChange={(e)=>setLastName(e.target.value)} className="border p-2 mb-2 w-full rounded" type="text" name="Last Name" placeholder="Ato" />

                <label htmlFor="Email" className='self-start mb-1 text-gray-700'>Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} className="border p-2 mb-2 w-full rounded" type="email" name="email" placeholder="kAto@gmail.com" />

                <label htmlFor="Password" className='self-start mb-1 text-gray-700'>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} className="border p-2 mb-2 w-full rounded" type="password" name="password" placeholder="*************" />

                <label htmlFor="Role" className='self-start mb-1 text-gray-700'>Role</label>
                <select onChange={(e)=>setRole(e.target.value)} className="border p-2 mb-2 w-full rounded" > 
                    <option value="user">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 w-full mt-2 rounded cursor-pointer hover:bg-blue-700">Register</button>

            </div>
        </div>
    )
}

export default Register; 