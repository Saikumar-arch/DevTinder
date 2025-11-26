import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utility/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utility/constants";
import { CheckValidation } from "../Utility/Validation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("Sai@gmail.com");
  const [password, setPassword] = useState("Sai@123");
  const [isSignin, setIsSignin] = useState(true);
  const [errorMessage, setErrorMessage] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = useRef(null);
  const validatePassword = useRef(null);

  const toggleSignin = () => {
    setIsSignin(!isSignin);
  };

  const handleClickButton = async () => {
    const errors = CheckValidation(
      validateEmail.current.value,
      validatePassword.current.value
    );
    setErrorMessage(errors);

    try {

      const res = await axios.post(`${BASE_URL}/api/login`,
  { email: emailId, password },
  { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/Feed");
    } catch (err) {
      console.error("Login/Register failed:", err.response?.data || err);
      setErrorMsg("Invalid credentials or server error");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-slate-600 w-96 shadow-sm">
        <div className="card-body text-white">
          {!isSignin && (
            <div className="mx-3">
              <h3 className="card-title">Username</h3>
              <input 
    
                type="text"
                value={username}
                placeholder="Username"
                className="input input-md my-2 w-full text-white"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="mx-3">
            <h3 className="card-title">Email</h3>
            <input
              ref={validateEmail}
              type="email"
              value={emailId}
              placeholder="Enter email"
              className="input input-md my-2 w-full text-white"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <p className="text-red-400 text-sm">{errorMessage.email}</p>
          </div>

          <div className="mx-3">
            <h3 className="card-title">Password</h3>
            <input
              ref={validatePassword}
              type="password"
              value={password}
              placeholder="Password"
              className="input input-md my-2 w-full text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-400 text-sm">{errorMessage.password}</p>
          </div>

          <p className="m-2 text-red-400 text-sm">{errorMsg}</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleClickButton}>
              {isSignin ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-2 cursor-pointer text-blue-200 hover:underline"
            onClick={toggleSignin}
          >
            {isSignin
              ? "New to Dev-Tinder? Sign Up"
              : "Already have an account? Sign In"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
