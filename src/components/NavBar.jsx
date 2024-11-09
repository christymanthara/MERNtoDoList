import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import { AuthContext } from '../context/AuthContext';
// import { FaHome } from "react-icons/fa";




const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here, e.g., call a login API
        console.log("Logging in with:", username, password);
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
