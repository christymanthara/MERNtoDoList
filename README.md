# To-Do FullStack Application 🚀

A comprehensive **FullStack To-Do Application** that enables users to manage their daily tasks efficiently. Built with the MERN stack (MongoDB, Express, React, Node.js), it features user authentication, dynamic task management, and Dockerized deployment for seamless setup.

## Features ✨

- **User Authentication**: Secure login and registration with hashed passwords using `bcrypt`.  
- **Dynamic To-Do Management**:  
  - Add, edit, mark complete, and delete tasks.  
  - Separate sections for completed and pending tasks.  
- **Role-Based Task Display**:  
  - All users can view all tasks on the home page.  
  - CRUD operations are limited to the logged-in user's tasks.  
- **Responsive Frontend**: Built with React and styled with TailwindCSS for a seamless user experience.  
- **Dockerized Deployment**: Easily set up the project using Docker Compose.  

---

## Tech Stack 🛠️

**Frontend:** React, React Router DOM, Axios, TailwindCSS  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Authentication:** JWT, Bcrypt  
**DevOps:** Docker, Docker Compose  

---

## Installation & Setup ⚙️

### Prerequisites  
- Install [Node.js](https://nodejs.org/)  
- Install [Docker](https://www.docker.com/)  
- Clone this repository:  
  ```bash
  git clone <repository-url>
  cd <repository-directory>


# on the root folder execute this
npm run start-all

# to reorganize and component and rebuild using docker
docker-compose down && docker-compose up --build

# after runnning on docker you can access them as follows 
Access the frontend at http://localhost:5173 and backend API at http://localhost:5000. 
