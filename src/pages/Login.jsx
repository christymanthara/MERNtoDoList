import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            login(response.data);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className='register-container text-slate-200 bg-gradient-to-r from-purple-500 to-pink-500' >
            
            <h1>Login</h1>
            <form onSubmit={handleSubmit}className="register-form bg-transparent font-sans text-slate-200 ">
                <input type="email" className="hover:font-semibold" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" className="hover:font-semibold" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
