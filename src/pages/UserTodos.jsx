import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function UserTodos() {
    const { user } = useContext(AuthContext); // Get the logged-in user from AuthContext
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Fetch the user's to-dos on component mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {//axios get
                const response = await axios.get(`http://localhost:5000/user/${user.id}/todos`); // Replace with your endpoint
                setTodos(response.data);
            } catch (error) {
                console.error("Failed to load todos", error);
            }
        };

        fetchTodos();
    }, [user.id]);

    // Create a new to-do
    const handleAddTodo = async () => {
        try {//axios post
            const response = await axios.post(`http://localhost:5000/user/${user.id}/todos`, { text: newTodo });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error("Failed to add todo", error);
        }
    };

    // Update an existing to-do
    const handleUpdateTodo = async (id, updatedText) => {
        try {
            await axios.put(`http://localhost:5000/todos/${id}`, { text: updatedText });
            setTodos(todos.map(todo => todo.id === id ? { ...todo, text: updatedText } : todo));
        } catch (error) {
            console.error("Failed to update todo", error);
        }
    };

    // Delete a to-do
    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Failed to delete todo", error);
        }
    };

    return (
        <div>
            <h1>{user.name}'s To-Do List</h1>
            
            {/* Add New To-Do */}
            <div className="mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New to-do"
                    className="border rounded p-2"
                />
                <button onClick={handleAddTodo} className="bg-blue-500 text-white p-2 rounded ml-2">Add Task</button>
            </div>

            {/* Display User's To-Dos */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={todo.text}
                            onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
                            className="border rounded p-2 flex-grow"
                        />
                        <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-white p-2 rounded ml-2">
                            Delete Task
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserTodos;
