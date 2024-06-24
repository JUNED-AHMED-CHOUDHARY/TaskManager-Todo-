// 

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const ViewCreateModal = ({ showViewModal, setShowViewModal, viewTask }) => {
  const [task, setTask] = useState([]);
  const id = viewTask;

  useEffect(() => {
    const fetchSingleTask = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/getsingletask/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTask(res.data.task);
          toast.success(res.data.message);
        })
        .catch((err) => toast.error(err.response.data.message));
    };

    if (id) {
      fetchSingleTask();
    }
  }, [id]);

  return (
    <div className="h-screen w-screen flex justify-center relative -top-44 overflow-hidden">
      <div className="flex flex-col gap-4 w-[500px] h-auto max-h-[80%] z-50 bg-white shadow-lg rounded-lg">
        <div className="flex w-full items-center justify-between p-2 px-4 border-b-2">
          <p className="font-medium text-4xl text-gray-600">View Task</p>
          <IoCloseSharp
            className="font-medium text-4xl text-gray-600 cursor-pointer"
            onClick={() => setShowViewModal(false)}
          />
        </div>

        <div className="flex flex-col p-3 gap-4 w-[80%] mx-auto overflow-auto">
          <label className="flex flex-col gap-2 items-start">
            <p className="text-xl font-medium">Title :</p>
            <p className="rounded-md py-2 px-4 w-full bg-white text-gray-800 border border-gray-300">
              {task.title}
            </p>
          </label>

          <label className="flex flex-col gap-2 items-start">
            <p className="text-xl font-medium">Description :</p>
            <p className="rounded-md py-2 px-4 w-full bg-white text-gray-800 border border-gray-300 word-wrap">
              {task.description}
            </p>
          </label>

          <button
            className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 font-medium text-xl"
            onClick={() => setShowViewModal(false)}
          >
            Close
          </button>
        </div>
      </div>

      <div
        className="absolute inset-0 h-screen w-screen bg-black bg-opacity-50 backdrop-blur-md z-40"
        onClick={() => setShowViewModal(false)}
      ></div>
    </div>
  );
};

export default ViewCreateModal;