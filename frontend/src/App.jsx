import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});

  const [taskType, setTaskType] = useState("All Tasks");

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );

        setIsAuthenticated(true);
        setUser(data.fullUser);
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
        setUser({});
      }
    };
      getUser();
  }, [isAuthenticated]);

  return (
    <div className="">
      <Navbar
        tasks={tasks}
        setTasks={setTasks}
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        setTaskType = {setTaskType}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isAuthenticated={isAuthenticated}
              tasks={tasks}
              setTasks={setTasks}
              taskType = {taskType}

            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
            isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile user={user} isAuthenticated={isAuthenticated} setUser= {setUser}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
