import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import StudentList from "./pages/Student";
import CreateStudent from "./pages/CreateStudent";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<PrivateRoute />}>
          <Route element={<Home />} path="/" />
          <Route element={<StudentList />} path="/student" />
          <Route element={<CreateStudent />} path="/create-student" />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
