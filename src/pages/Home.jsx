import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AgeSorter from '../components/AgeSorter';
import UserTodos from './UserTodos';
import { AuthContext } from '../context/AuthContext';

function Home() {
    const [users, setUsers] = useState([]);
    const { user, login, logout } = useContext(AuthContext); // Access the logged-in user from context

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all-todos'); // Adjust endpoint as needed
                setUsers(response.data); // Assuming each user object includes 'age' and 'todos'
            } catch (error) {
                console.error("Failed to load users", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Welcome to the To-Do List</h1>

            {/* Render the logged-in user's to-do list if they are authenticated */}
            {user && (
                <div className="my-8">
                    <h2 className="text-xl font-bold mb-4">Your To-Do List</h2>
                    <UserTodos />
                </div>
            )}

            {/* Display all users’ to-do lists sorted by age groups */}
            <AgeSorter users={users} />
        </div>
    );
}

export default Home;
