// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = ({ isAuthenticated, setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     image: "",
//   });

//   const [image, setImage] = useState("");

//   const changeHandler = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const navigate = useNavigate();

//   const submitHandler = async(e) => {
//     e.preventDefault();

//     try {

//       // const res = await axios.post("", formData, {withCredentials: true, 
//       //   headers: {
//       //     "Content-Type": "multipart/form-data",
//       //   }
//       // });

//       // setFormData({name: "", email: "", phone:"", password: ""});
//       // setImage("");
      
      
//       // setIsAuthenticated(true);

//       const formDataToSubmit = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         formDataToSubmit.append(key, value);
//       });
//       formDataToSubmit.append("image", image);

//       const res = await axios.post("http://localhost:4000/api/v1/signup", formDataToSubmit, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setFormData({ name: "", email: "", phone: "", password: "" });
//       setImage(null);
//       console.log("auth before -> ", isAuthenticated);
//       setIsAuthenticated(true);
//       console.log("auth after -> ", isAuthenticated);
//       toast.success(res.data.message);
      
//     } catch(err) {
//         console.log(err);
//         toast.error(err.response.data.message);
//     }
//   }

//   if (isAuthenticated) {
//     return navigate("/");
//     console.log("isauth => ", isAuthenticated);
//     // or use Navigate
//   }


//   const imageHandler = (e) => {
//     e.preventDefault();
//     const file = e.target.files[0];
//     setImage(file);
//   }

//   return (
//     <div className="flex w-scree h-screen justify-center mt-20">
     
//       <form onSubmit={submitHandler} className="flex flex-col gap-6 bg-cyan-100 h-fit p-6 rounded-lg shadow-lg">
//     <input
//         type="text"
//         placeholder="Enter name"
//         value={formData.name}
//         name="name"
//         className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         onChange={changeHandler}
//     />

//     <input
//         type="email"
//         placeholder="Enter email"
//         value={formData.email}
//         name="email"
//         className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         onChange={changeHandler}
//     />

//     <input
//         type="number"
//         placeholder="Enter phone"
//         value={formData.phone}
//         name="phone"
//         className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         onChange={changeHandler}
//     />

//     <input
//         type="password"
//         placeholder="Enter password"
//         value={formData.password}
//         name="password"
//         className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         onChange={changeHandler}
//     />

//     <input
//         type="file"
//         placeholder="Upload image"
//         name="image"
//         className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         onChange={imageHandler}
//     />


//       <div className="flex gap-3 items-center font-bold">
//         <p className="text-gray-700">Already registered ?</p>
//         <Link to={"/login"} className="underline text-blue-800 underline-offset-4">login</Link>
//       </div>

//     <button className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">Sign Up</button>
// </form>

//     </div>
//   );
// };

// export default Signup;




import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ isAuthenticated, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth status changed:", isAuthenticated);
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    console.log("Image file selected:", file);
    setImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });
      if (image) {
        formDataToSubmit.append("image", image);
      }

      console.log("Submitting form data:", Array.from(formDataToSubmit.entries()));

      const res = await axios.post("http://localhost:4000/api/v1/signup", formDataToSubmit, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({ name: "", email: "", phone: "", password: "", image: "" });
      setImage(null);
      setIsAuthenticated(true);
      toast.success(res.data.message);

    } catch (err) {
      console.error("Error during signup:", err);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center mt-20">
      <form onSubmit={submitHandler} className="flex flex-col gap-6 bg-cyan-100 h-fit p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter name"
          value={formData.name}
          name="name"
          className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={formData.email}
          name="email"
          className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onChange={changeHandler}
        />
        <input
          type="number"
          placeholder="Enter phone"
          value={formData.phone}
          name="phone"
          className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={formData.password}
          name="password"
          className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onChange={changeHandler}
        />
        <input
          type="file"
          placeholder="Upload image"
          name="image"
          className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onChange={imageHandler}
        />
        <div className="flex gap-3 items-center font-bold">
          <p className="text-gray-700">Already registered ?</p>
          <Link to={"/login"} className="underline text-blue-800 underline-offset-4">login</Link>
        </div>
        <button className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;