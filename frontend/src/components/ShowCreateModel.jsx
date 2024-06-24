import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const ShowCreateModel = ({ setShowCreateModal, tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const createHandler = async () => {
    console.log("all good till here ", title, description);
  
    await axios
      .post(
        "https://taskmanager-backend-p5r2.onrender.com/api/v1/createtask",
        { title, description },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTitle("");
        setDescription("");
        setTasks(prev => [...prev, res.data.task]);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    setShowCreateModal(false);
  };

  return (
    <div className="h-screen w-screen flex justify-center relative -top-44 overflow-hidden">
      <div className="flex flex-col gap-10 w-[500px] h-[500px] z-50 bg-white">
        <div className="flex w-full items-center justify-between p-2 px-4 border-b-2">
          <p className="font-medium text-4xl text-gray-600">Create Task</p>
          <IoCloseSharp
            className="font-medium text-4xl text-gray-600 cursor-pointer"
            onClick={() => setShowCreateModal(false)}
          />
        </div>

        <div className="flex justify-between flex-col p-3 gap-10 w-[80%] mx-auto">
          <label className="flex gap-5 items-center">
            <p className="text-xl font-medium">Title :</p>
            <input
              type="text"
              placeholder="title"
              className="rounded-md py-2 px-4 w-[80%] bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="title"
              value={title}
              onChange={titleHandler}
            />
          </label>

          <label className="flex gap-5 items-center">
            <p className="text-xl font-medium">Description :</p>
            <textarea
              type=""
              placeholder="Description"
              className="rounded-md py-2 px-4 w-[63%] bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={7}
              cols={6}
              name="description"
              value={description}
              onChange={descriptionHandler}
            />
          </label>

          <button
            className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 font-medium text-xl"
            onClick={createHandler}
          >
            Create
          </button>
        </div>
      </div>

      <div
        className="absolute inset-0 h-screen w-screen bg-black bg-opacity-50 backdrop-blur-md z-40"
        onClick={() => setShowCreateModal(false)}
      ></div>
    </div>
  );
};

export default ShowCreateModel;

