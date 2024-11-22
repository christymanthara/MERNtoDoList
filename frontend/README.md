# ToDo List

A todo list web application that allows the user to signup and then create a todo list for himself. Also displays the todo list to all the users but allows only the signed in user to edit his own todo


# building the Dockerfile
docker build -t toDoApp 

# To check your Docker Image, execute

docker images

# on the root folder execute this
npm run start-all

# to reorganize and component and rebuild using docker
docker-compose down && docker-compose up --build

# after runnning on docker you can access them as follows 
Access the frontend at http://localhost:5173 and backend API at http://localhost:5000. 
