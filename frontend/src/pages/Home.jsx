import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import axios from 'axios';
import todosData from '../../src/assets/sampleTodos.json'; //sample todo for the checks
import Card from '../components/Card';
// import Card from '../components/CardList';
import Navbar from '../components/NavBar';
// import toDoDetails from '../components/toDoDetails';

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
    const [toDos, setToDos] = useState(null);
    const [users, setUsers] = useState([]);
    const [todosByUser, setToDosByUser] = useState([]);

    //fetching the todos
    useEffect(() => {
      console.log("Home component mounted");
      apiCall();
  
      const fetchToDosAndUsers = async () => {
        try {
          const todosResponse = await fetch('http://localhost:5000/api/todos/'); // or we can use axios.get for the same
          const usersResponse = await axios.get('http://localhost:5000/api/auth/users');
          
          // Set the users
          setUsers(usersResponse.data);
  
          // Set the todos if the response is ok
          if (todosResponse.ok) {
            const todosData = await todosResponse.json();
            console.log("Fetched todos:", todosData);
            setToDos(todosData);
          } else {
            console.error("Failed to fetch todos.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchToDosAndUsers();
    }, []);

    useEffect(() => {
      if (toDos && users.length > 0) {
          const mappedTodos = users.map((user) => ({
              userName: `${user.Name} ${user.Surname}`,
              userId: user._id,
              todos: toDos.filter((todo) => todo.userId === user._id)
          }));
          setToDosByUser(mappedTodos);
      }
  }, [toDos, users]);

    const getUserName = (userId) => {
      const user = users.find((user) => user._id === userId);
      return user ? `${user.Name} ${user.Surname}` : "Unknown User";
  };

    // console.log(getUserName("672fd4582d09749f2682ec56")); //checking if user values have been fetched // working


// displaying the fetched values
    useEffect(() => {
      console.log("Updated toDos:", toDos);
  }, [toDos]);
      

    return (
      
        <section className="bg-white dark:bg-gray-900">
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-2 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 h-full w-full object-cover opacity-80 z-0"
      />
      
      <div className="hidden lg:relative lg:block lg:p-12">
        
        <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        Welcome to the To-Do List 🤹‍♂️
        </h2>
        <Navbar />
        <p className="mt-4 leading-relaxed text-white/90">
          Your personal companion to organize your stuff on the go!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto h-full"> 
        {
            <div>
                {todosByUser.length > 0 ? (
                        todosByUser.map((userTodos) => (
                          <Card
                            key={userTodos.userId} // Use userId for a unique key
                            userName={userTodos.userName}
                            todos={userTodos.todos}
                          />
                        ))
                      ) : (
                        <p>No todos available</p>
                      )}
            </div>
       }
        </div>
      </div>
            </section>            
        </div>
        </section>
    );
}

export default Home;
