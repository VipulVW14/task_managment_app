import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await dispatch(loginUser({ email, password }));
    navigate("/tasks");
  };

  return (
    <div className="grid grid-cols-4 bg-white h-screen w-full">
      <div className="w-full items-center flex flex-col mt-15 rounded-lg">
        <div className="flex align-bottom">
          <span className="mt-1 mr-4"><FaTasks size={28}/></span>
          <p className="text-3xl mb-15 font-mono font-bold leading-tight tracking-normal text-gray-800">Task Manager</p>
        </div>
        <p className="text-2xl mb-9 font-mono font-medium">
            Login to your account
        </p>
        
        <form onSubmit={handleLogin} className="bg-white w-70 mx-10">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-[20px] font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border-b-2 rounded-sm border-gray-300 text-gray-900 sm:text-sm focus:outline-none focus:border-b-2-blue-600 block w-full p-2.5"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <br/>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-[20px] font-medium text-gray-900"
            >
              Password
            </label>

            <input
              type="password"
              name="Password"
              id="password"
              placeholder="Enter your password"
              className="border-b-2 rounded-sm border-gray-300 text-gray-900 sm:text-sm focus:outline-none focus:border-b-2-primary-600 block w-full p-2.5"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br/>

          <button
            type="submit"
            className="text-gray-100 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-md w-full mt-3 px-5 py-2 text-center"
          >
            Login
          </button>
        </form>
      </div>
      
      <div className="col-span-3">
        <img
          className=" w-full h-full"
          src="https://i.postimg.cc/1zMrsJLZ/DALL-E-2025-01-30-17-05-02-A-modern-and-sleek-task-management-app-interface-displayed-on-a-futuris.webp"
        />
      </div>
    </div>
  );
};

export default Login;
