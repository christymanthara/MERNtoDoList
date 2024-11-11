import { Link, useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { AuthContext  } from '../context/AuthContext';
import axios from "axios";
// import { FaHome } from "react-icons/fa";




const Navbar = () => {
    const { user,token,login, logout } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                Email:username,
                Password:password,
            });
    
            const { token, user } = response.data;
    
            // Store the token in localStorage or context for authentication persistence
            localStorage.setItem('token', token);
    
            // Update the AuthContext with the logged-in user
            login(user, token);  // Assuming you have a `login` function in AuthContext to set the user
    
            console.log("User logged in:", user);
            navigate('/login');
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <header>
            <div className='"relative z-10"'>
            {!user ? (
            <div className="container flex justify-between items-center">
                <Link to="/" className="text-blue-500">
                    {/* <FaHome size={24} /> */}
                </Link>
                {/* Login Form */}
                <form onSubmit={handleLogin} className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-1 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-1 border rounded"
                        required
                    />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                 
                {/* Register Link */}
                <Link to="/register" className="ml-4 text-blue-500 underline">
                    Sign Up
                </Link>
            </div>
            ):(
                <>
                    <p>Welcome back, {user.name}!</p>
                    <button onClick={logout} className="btn btn-danger">Logout</button>
                </>
            )}
            </div>
        </header>
    );
};

export default Navbar;
