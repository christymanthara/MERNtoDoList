
import React from 'react';

const Card = ({ userName, todos }) => {
    return (
        <div className="card bg-white dib p-4 grow shadow-md rounded-lg">
            <h2 className="font-bold text-lg mb-2">{userName}'s To-Do List</h2>
            <div>
            {console.log(userName)}
            <ul>
                {todos.map((task, index) => (
                    <li key={index} className="py-1">
                        {task}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );  
}   

export default Card;
