// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Signup from "./pages/SignUp";
import Login from "./pages/login";
import CreateBlog from "./pages/CreateBlog";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Blog from "./pages/Blog";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route
        path="/create-blog"
        element={
          <ProtectedRoute path="/create-blog" component={<CreateBlog />} />
        }
      />
      <Route path="/blog" element={<Blog />} />
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
