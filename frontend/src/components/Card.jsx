
import React from 'react';

const Card = ({ userName, todos }) => {
    return (
        <div className="bg-inherit p-4 shadow-md rounded-lg w-full hover:shadow-blue-700">
            <h2 className="font-bold text-lg mb-2">{userName}'s To-Do List</h2>
            <div>
            {console.log(userName)}
            {console.log(todos)}
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id} className="border-b border-gray-200 py-1">
                        {todo.task}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );  
}   

export default Card;
