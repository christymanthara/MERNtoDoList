import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserTodos from './pages/UserTodos';
import ProtectedRoute from './components/ProtectedRoute';
// import Navbar from './components/NavBar';

function App() {
  const [count, setCount] = useState(0)

  return (
  <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-todos" element={<ProtectedRoute><UserTodos /></ProtectedRoute>} />
    </Routes>
</Router>

  )
}

export default App
