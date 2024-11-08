import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import axios from 'axios';
import todosData from '../../src/assets/sampleTodos.json'; //sample todo for the checks
import Card from '../components/Card';

const apiCall = () => {
  axios.get('http://localhost:5000/')
    .then((response) => {
      console.log(response.data); // the data we send from the backendserver
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};


function Home() {
    const { user, logout } = useContext(AuthContext); // Access the logged-in user from context

    useEffect(() => {
      console.log("Home component mounted");
      apiCall();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-2 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 h-full w-full object-cover opacity-80 z-0"
      />
      <div className="hidden lg:relative lg:block lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto h-full"> 
        {todosData.map((user, index) => (
                    <Card 
                    key={index} 
                    userName={user.userName} 
                    todos={user.todos} />
                ))}

        </div>

        <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        Welcome to the To-Do List 🤹‍♂️
        </h2>
              
        <p className="mt-4 leading-relaxed text-white/90">
          Your personal companion to organize your stuff on the go!
        </p>
      </div>
            </section>
            <section className='"relative z-10"'>
            {!user ? (
                <div className="content-centers place-content-center py-8 text-slate-200">
                    <Link to="/login">
                        <button className="text-center btn btn-primary hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="text-center btn btn-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Register</button>
                    </Link>
                </div>
            ) : (
                <>
                    <p>Welcome back, {user.name}!</p>
                    <button onClick={logout} className="btn btn-danger">Logout</button>
                </>
            )}
            </section>
            
        </div>
        </section>
    );
}

export default Home;
