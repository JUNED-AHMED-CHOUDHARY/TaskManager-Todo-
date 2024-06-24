// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Navbar = ({ tasks, setTasks, setIsAuthenticated, isAuthenticated }) => {
//   const [allTasks, setAllTasks] = useState([]);
//   useEffect(() => {
//     fetchAllTasks();
//   }, [isAuthenticated]);

//   const fetchAllTasks = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:4000/api/v1/getalltask/",
//         { withCredentials: true }
//       );

//       setAllTasks(data.allTasks);
//       setTasks(data.allTasks);
//     } catch (err) {
//       console.log(err);

//       toast.error(err.response.data.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:4000/api/v1/logout", {
//         withCredentials: true,
//       });
//       console.log("res = ", data);
//       toast.success(data.message);
//       setIsAuthenticated(false);
//     } catch (err) {
//       toast.error(err.response.data.message);
//     }
//   };

//   const [dropDownValue, setDropDownValue] = useState("All Tasks");
//   const filterTasks = [];

//   const filterArray = () => {
//     switch (dropDownValue) {
//       case "Completed":
//         filterTasks = allTasks.filter((item) => item.status === "Completed");
//         break;
//       case "Incomplete":
//         filterTasks = allTasks.filter((item) => item.status === "Incomplete");
//         break;
//       case "archived": 
//       filterTasks = allTasks.filter((item) => item.archived === true);

//       default:
//         filterTasks = allTasks;
//     }

//     setAllTasks(filterTasks);
//   }


//   const dropDownChangeHandler = (e) => {
//     setDropDownValue(e.target.value);
//     filterArray();
//   };

//   console.log(dropDownValue);

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <>
//       <div className="w-[1280px] mx-auto flex justify-center mt-5 h-fit">
//         <ul className="w-full flex justify-between p-1">
//           <div className="flex justify-between w-1/5">
//             <Link
//               className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
//               to="/"
//             >
//               <li>Home</li>
//             </Link>

//             <Link className="">
//               <li>
//                 <select
//                   name="dropDownValue"
//                   id=""
//                   className="pl-2 pr-2 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-gray-500  transition-all duration-200 cursor-pointer"
//                   onChange={dropDownChangeHandler}
//                 >
//                   <option value={"All Tasks"}>All tasks</option>
//                   <option value={"Incomplete"}>Incompleted</option>
//                   <option value={"Completed"}>Completed</option>
//                   <option value={"archived"}>Archived</option>
//                 </select>
//               </li>
//             </Link>
//           </div>
//           <div className="flex w-1/5 justify-between">
//             <Link
//               className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
//               to="/profile"
//             >
//               <li>Profile</li>
//             </Link>
//             <Link
//               className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
//               onClick={handleLogout}
//               to="/"
//             >
//               <li>Logout</li>
//             </Link>
//           </div>

//           <div className="flex w-1/5 justify-between">
//             <Link
//               className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
//               to="/signup"
//             >
//               <li>signup</li>
//             </Link>
//             <Link
//               className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
//               to="/login"
//             >
//               <li>Login</li>
//             </Link>
//           </div>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ tasks, setTasks, setIsAuthenticated, isAuthenticated , setTaskType}) => {
  const [allTasks, setAllTasks] = useState([]);
  const [dropDownValue, setDropDownValue] = useState("All Tasks");

  useEffect(() => {
    if (isAuthenticated) {
      console.log("checking is true ", isAuthenticated);
      fetchAllTasks();
    }
  }, [isAuthenticated, dropDownValue]);

  const fetchAllTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/getalltask/", {
        withCredentials: true,
      });
      setAllTasks(data.allTasks);
      setTasks(data.allTasks);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred while fetching tasks");
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/logout", {
        withCredentials: true,
      });
      toast.success(data.message);

      setTasks([]);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred while logging out");
    }
  };

  const filterArray = () => {
    let filterTasks;
    switch (dropDownValue) {
      case "Completed":
        filterTasks = allTasks.filter((item) => item.status === "Completed");
        setTaskType("Completed Bindass !");
        break;
      case "Incomplete":
        filterTasks = allTasks.filter((item) => item.status === "Incomplete");
        setTaskType("Incomplete Tasks !!!  Complete karne ko Mangta !!");
        break;
      case "Archived":
        filterTasks = allTasks.filter((item) => item.archived === true);
        setTaskType("Archived Tasks!! Koi dekh ni le IAS ke Task hai");

        break;
      default:
        filterTasks = allTasks;
        setTaskType("All Tasks");
    }

    setTasks(filterTasks);
  };

  const dropDownChangeHandler = (e) => {
    setDropDownValue(e.target.value);
  };

  useEffect(() => {
    filterArray();
  }, [dropDownValue, allTasks]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="w-[1280px] mx-auto flex justify-center mt-5 h-fit">
      <ul className="w-full flex justify-between p-1">
        <div className="flex justify-between w-1/3">
          <Link
            className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
            to="/"
          >
            <li>Home</li>
          </Link>
          <select
            name="dropDownValue"
            id=""
            className="pl-2 pr-2 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-gray-500 transition-all duration-200 cursor-pointer"
            onChange={dropDownChangeHandler}
            value={dropDownValue}
          >
            <option value="All Tasks">All tasks</option>
            <option value="Incomplete">Incompleted</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        <div className="flex w-1/3 justify-between">
          <Link
            className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
            to="/profile"
          >
            <li>Profile</li>
          </Link>
          <Link
            className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
            onClick={handleLogout}
            to="/"
          >
            <li>Logout</li>
          </Link>
        </div>
        {/* <div className="flex w-1/5 justify-between">
          <Link
            className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
            to="/signup"
          >
            <li>Signup</li>
          </Link>
          <Link
            className="px-7 text-white font-semibold text-lg py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200"
            to="/login"
          >
            <li>Login</li>
          </Link>
        </div> */}
      </ul>
    </div>
  );
};

export default Navbar;
