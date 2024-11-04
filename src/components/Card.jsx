
import React from 'react';

function Card({ userName, todos }) {
    return (
        <div className="card bg-white p-4 shadow-md rounded-lg">
            <h2 className="font-bold text-lg mb-2">{userName}'s To-Do List</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="border-b border-gray-200 py-1">
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Card;
