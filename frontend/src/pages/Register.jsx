import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const { login } = useContext(AuthContext);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('age', age);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(result => {console.log(result)
                navigate("/login") //navigating to login page upon successful registration
            });
            login(response.data);  // Log the user in after successful registration
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className=" register-container bg-gradient-to-r from-sky-500 to-indigo-500">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="register-form bg-transparent text-slate-200">
                <label>
                    Name:
                    <input 
                        className="hover:font-semibold"
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Surname:
                    <input 
                        className="hover:font-semibold"
                        type="text" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Age:
                    <input 
                        className="hover:font-semibold"
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        min="1" 
                        step="1" 
                        required 
                    />
                </label>

                <label>
                    Email:
                    <input 
                        className="hover:font-semibold"
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Password:
                    <input 
                        className="hover:font-semibold"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Profile Picture:
                    <input 
                        className="hover:font-semibold"
                        type="file" 
                        onChange={handleImageUpload} 
                        accept="image/*" 
            
                    />
                </label>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
