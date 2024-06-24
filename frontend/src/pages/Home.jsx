// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Navigate } from "react-router-dom";
// import { MdEdit, MdDelete } from "react-icons/md";
// import { FaEye } from "react-icons/fa";

// const Home = ({ isAuthenticated, tasks, setTasks }) => {
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);

//   const [viewTask, setViewTask] = useState("");
//   const [updateTask, setUpdateTask] = useState("");

//   const deleteTask = async (id) => {
//     console.log("id in frontend for deleting -> ", id);
//     await axios
//       .delete(`https://taskmanager-backend-p5r2.onrender.com/api/v1/deletetask/${id}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setTasks(tasks.filter((task) => task._id !== id));
//         toast.success(res.data.message);
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   };

//   const handleCreateModalClose = () => {
//     setShowCreateModal(false);
//   };

//   const handleViewModalClose = () => {
//     setShowViewModal(false);
//   };

//   const handleUpdateModalClose = () => {
//     setShowUpdateModal(false);
//   };

//   const handleCreateModalShow = () => {
//     setShowCreateModal(true);
//   }

//   const handleUpdateModalShow = (id) => {
//     setUpdateTask(id);
//     setShowUpdateModal(true);
//   }

//   const handleViewModalShow = (id) => {
//     setViewTask(id);
//     setShowViewModal(true);
//   }

//   if (!isAuthenticated) {
//     console.log("ye chal nhi raha", !isAuthenticated);
//     <Navigate to={"/login"} />;
//   }

//   return (
//     <div className="flex flex-col gap-10">

//       <button onClick={handleCreateModalShow}>Create Task</button>

//       <div className="flex gap-5 w-[1080px] flex-wrap">
//         {
//           tasks && tasks.length > 0  ? (
//             (
//               tasks.map((task) => (
//                 <div className="flex flex-col gap-5 border" key={task._id}>

//                   <h2>{task.title}</h2>

//                   <p>{task.description}</p>

//                   <div className="ml-auto flex items-center gap-2">
//                       <MdEdit />
//                       <MdDelete onClick={() => deleteTask(task._id)}/>
//                       <FaEye />
//                   </div>

//                 </div>
//               ))
//             )
//           ) : (
//             <h1>You dont have a task</h1>
//           )
//         }
//       </div>

//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ShowCreateModel from "../components/ShowCreateModel";
import ViewCreateModal from "../components/ViewCreateModal";
import UpdateCreateModal from "../components/UpdateCreateModal";
import { MdCreateNewFolder } from "react-icons/md";


const Home = ({ isAuthenticated, tasks, setTasks, taskType }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [viewTask, setViewTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");

  const deleteTask = async (id) => {
    console.log("id in frontend for deleting -> ", id);
    await axios
      .delete(`https://taskmanager-backend-p5r2.onrender.com/api/v1/deletetask/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task._id !== id));
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
  };

  const handleViewModalClose = () => {
    setShowViewModal(false);
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };

  const handleCreateModalShow = () => {
    setShowCreateModal(true);
  };

  const handleUpdateModalShow = (id) => {
    setUpdateTask(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTask(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  console.log("show create model -> ", showCreateModal);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between mt-10 w-1/2 mx-auto items-center gap-10">
        <p className="bg-cyan-500 text-white py-2 px-4 rounded-md font-medium text-xl w-fit">{taskType}</p>
        <button
          onClick={handleCreateModalShow}
          className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 font-medium text-xl w-fit flex items-center gap-2"
        >
          Create Task 
        <MdCreateNewFolder className="text-xl" />
        </button>
      </div>
      <div className="flex gap-5 w-[1080px] flex-wrap">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="flex flex-col gap-5 border" key={task._id}>
              <h2>
                {task.title.length <= 40
                  ? task.title
                  : task.title.slice(0, 40) + "..."}
              </h2>
              <p>
                {task.description.length <= 100
                  ? task.description
                  : task.description.slice(0, 100) + "..."}
              </p>
              <div className="ml-auto flex items-center gap-2">
                <MdEdit onClick={() => handleUpdateModalShow(task._id)} />
                <MdDelete onClick={() => deleteTask(task._id)} />

                <FaEye onClick={() => handleViewModalShow(task._id)} />
              </div>
            </div>
          ))
        ) : (
          <h1>You don't have any tasks</h1>
        )}
      </div>

      {/* create modal  */}
      {showCreateModal ? (
        <ShowCreateModel
          setShowCreateModal={setShowCreateModal}
          tasks={tasks}
          setTasks={setTasks}
        />
      ) : null}

      {/* view modal  */}
      {showViewModal ? (
        <ViewCreateModal
          showViewModal={showViewModal}
          setShowViewModal={setShowViewModal}
          viewTask={viewTask}
        />
      ) : null}

      {/* update modal */}
      {showUpdateModal ? (
        <UpdateCreateModal
          updateTask={updateTask}
          setShowUpdateModal={setShowUpdateModal}
          setTasks={setTasks}
        />
      ) : null}
    </div>
  );
};

export default Home;
