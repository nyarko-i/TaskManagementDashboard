import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../context/authStore';

const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuthStore();
    const [email, setEmail] = useState(""); //Stores user input 
    const [password, setPassword] = useState(""); //stores password input

    const handleLogin = () => {
        if (email && password.length >= 6){   // basic validation
            login({email, role: "user"}); // simulate login
            navigate("/dashboard"); // redirect after login
        }else {
            alert("Invalid email or password"); 
        }
    };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4'>
        <div className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Task Management App</h1>
            <h2 className='text-2xl font-bold mb-6 text-blue-800 text-center'>Login Page</h2>

            <input
                className='border w-full max-w-sm p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                type="email" onChange={(e)=> setEmail(e.target.value)}
                placeholder='name@gmail.com'
            />

            <input
                className='border w-full max-w-sm p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                type="password" onChange={(e)=> setPassword(e.target.value)}
                placeholder='************'
            />

            <button
                className='w-full max-w-sm bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer'
                onClick={handleLogin}
            >
                Login
            </button>

        </div>
      
    </div>
  );
}

export default Login;
