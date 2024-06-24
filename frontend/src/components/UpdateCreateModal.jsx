// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { IoCloseSharp } from "react-icons/io5";

// const UpdateCreateModal = ({ updateTask, setShowUpdateModal, setTasks }) => {
//   const id = updateTask;

//   console.log("update id -> ", id);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("");
//   const [archived, setArchived] = useState("");

//   useEffect(() => {
//     const fetchSingleTask = async () => {
//       await axios
//         .get(`http://localhost:4000/api/v1/getsingletask/${id}`, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           setTitle(res.data.task.title);
//           setDescription(res.data.task.description);
//           setStatus(res.data.task.status);
//           setArchived(res.data.task.archived);
//         })
//         .catch((err) => toast.error(err.response.data.message));
//     };

//     if (id) {
//       fetchSingleTask();
//     }
//   }, [id]);

//   const updateTaskFun = async () => {
//     await axios
//       .put(`http://localhost:4000/api/v1/updatetask/${id}`,{title, description, status, archived}, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setTasks(res.data.allTasks);
//         toast.success(res.data.message);
//         setShowUpdateModal(false);
//       })
//       .catch((err) => toast.error(err.response.data.message));
//   };

//   if (id) {
//     updateTaskFun();
//   }

//   const titleHandler = (e) => {
//     setTitle(e.target.value);
//   };

//   const descriptionHandler = (e) => {
//     setDescription(e.target.value);
//   };

//   const statusHandler = (e) => {
//     setStatus(e.target.value);
//   };

//   const archivedHandler = (e) => {
//     setArchived(e.target.value);
//   };

//   return (
//     <div className="h-screen w-screen flex justify-center relative -top-44 overflow-hidden">
//       <div className="flex flex-col gap-4 w-[500px] h-auto max-h-[80%] z-50 bg-white shadow-lg rounded-lg">
//         <div className="flex w-full items-center justify-between p-2 px-4 border-b-2">
//           <p className="font-medium text-4xl text-gray-600">View Task</p>
//           <IoCloseSharp
//             className="font-medium text-4xl text-gray-600 cursor-pointer"
//             onClick={() => setShowUpdateModal(false)}
//           />
//         </div>

//         <div className="flex justify-between flex-col p-3 gap-5 w-[80%] mx-auto">
//           <label className="flex gap-5 items-center">
//             <p className="text-xl font-medium">Title :</p>
//             <input
//               type="text"
//               placeholder="title"
//               className="rounded-md py-2 px-4 w-[80%] bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               name="title"
//               value={title}
//               onChange={titleHandler}
//             />
//           </label>

//           <label className="flex gap-5 items-center">
//             <p className="text-xl font-medium">Description :</p>
//             <textarea
//               type=""
//               placeholder="Description"
//               className="rounded-md py-2 px-4 w-[63%] bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               rows={7}
//               cols={6}
//               name="description"
//               value={description}
//               onChange={descriptionHandler}
//             />
//           </label>

//           <label className="flex gap-5 items-center">
//             <p className="text-xl font-medium">Status :</p>
//             <select
//               className="rounded-md py-2 px-4 w-[63%] bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               name="status"
//               value={status}
//               onChange={statusHandler}
//             >
//               <option value="Incomplete">Incomplete</option>

//               <option value="Completed">Completed</option>
//             </select>
//           </label>

//           <label className="flex gap-5 items-center">
//             <p className="text-xl font-medium">Archived :</p>
//             <select
//               className="rounded-md py-2 px-4 w-[63%] bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               name="archived"
//               value={archived}
//               onChange={archivedHandler}
//             >
//               <option value={false}>No</option>
//               <option value={true}>Yes</option>
//             </select>
//           </label>

//           <button
//             className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 font-medium text-xl"
//             onClick={updateTaskFun}
//           >
//             Update
//           </button>
//         </div>
//       </div>

//       <div
//         className="absolute inset-0 h-screen w-screen bg-black bg-opacity-50 backdrop-blur-md z-40"
//         onClick={() => setShowUpdateModal(false)}
//       ></div>
//     </div>
//   );
// };

// export default UpdateCreateModal;

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const UpdateCreateModal = ({ updateTask, setShowUpdateModal, setTasks }) => {
  const id = updateTask;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [archived, setArchived] = useState("");

  useEffect(() => {
    const fetchSingleTask = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/getsingletask/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.task.title);
          setDescription(res.data.task.description);
          setStatus(res.data.task.status);
          setArchived(res.data.task.archived);
        })
        .catch((err) => toast.error(err.response.data.message));
    };

    if (id) {
      fetchSingleTask();
    }
  }, [id]);

  const updateTaskFun = async () => {
    await axios
      .put(
        `http://localhost:4000/api/v1/updatetask/${id}`,
        { title, description, status, archived },
        {
          withCredentials: true,
        }
      )
      .then((res) => {


        setTasks((prev) => {
            const updatedTasks = prev.map((task) => {
                if (task._id === id) {
                    return {
                        ...task, title, description, status, archived
                    }
                } else 
                    return task;
            
            })

            return updatedTasks;
        });



        toast.success(res.data.message);
        setShowUpdateModal(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const archivedHandler = (e) => {
    setArchived(e.target.value);
  };

  return (
    <div className="h-screen w-screen flex justify-center -top-44 relative overflow-hidden">
      <div className="flex flex-col gap-4 w-[500px] h-auto max-h-[80%] z-50 bg-white shadow-lg rounded-lg">
        <div className="flex w-full items-center justify-between p-2 px-4 border-b-2">
          <p className="font-medium text-4xl text-gray-600">Update Task</p>
          <IoCloseSharp
            className="font-medium text-4xl text-gray-600 cursor-pointer"
            onClick={() => setShowUpdateModal(false)}
          />
        </div>

        <div className="flex flex-col p-3 gap-1 w-[80%] mx-auto overflow-auto">
          <label className="flex flex-col gap-1 items-start">
            <p className="text-xl font-medium">Title :</p>
            <input
              type="text"
              placeholder="Title"
              className="rounded-md py-2 px-4 w-full bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="title"
              value={title}
              onChange={titleHandler}
            />
          </label>

          <label className="flex flex-col gap-1 items-start">
            <p className="text-xl font-medium">Description :</p>
            <textarea
              placeholder="Description"
              className="rounded-md py-2 px-4 w-full bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={4}
              name="description"
              value={description}
              onChange={descriptionHandler}
            />
          </label>

          <label className="flex flex-col gap-1 items-start">
            <p className="text-xl font-medium">Status :</p>
            <select
              className="rounded-md py-2 px-4 w-full bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="status"
              value={status}
              onChange={statusHandler}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Completed">Completed</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 items-start">
            <p className="text-xl font-medium">Archived :</p>
            <select
              className="rounded-md py-2 px-4 w-full bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="archived"
              value={archived}
              onChange={archivedHandler}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </label>

          <button
            className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 font-medium text-xl"
            onClick={updateTaskFun}
          >
            Update
          </button>
        </div>
      </div>

      <div
        className="absolute inset-0 h-screen w-screen bg-black bg-opacity-50 backdrop-blur-md z-40"
        onClick={() => setShowUpdateModal(false)}
      ></div>
    </div>
  );
};

export default UpdateCreateModal;
