/* eslint-disable no-constant-condition */
import { useRef, useState } from "react";
import auth from "../firebase/firebase.init";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Link } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoginError("");
    setLoginSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const userr = result.user;
        console.log(userr);
        setLoginSuccess("Login Success");
      })
      .catch((error) => {
        console.log(error);
        setLoginError("Invalid Login");
      });
    console.log(email, password);
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please enter your valid email");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("This is not a valid email");
      return;
    } else {
      console.log("Forget Password", emailRef.current.value);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Check your email");
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse gap-14">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Email: {}</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    ref={emailRef}
                    name="email"
                    placeholder="Enter Your Email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="input input-bordered"
                    placeholder="Enter Your Password"
                  />
                  <label className="label">
                    <a
                      onClick={handleForgetPassword}
                      href="#"
                      className="label-text-alt link link-hover"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                {loginError && <p className="text-red-500"> {loginError} </p>}

                {loginSuccess && (
                  <p className="text-green-500"> {loginSuccess} </p>
                )}
              </div>
            </form>
            <p>New to this website?</p>
            <Link to={"/register"}>
              <button className="bg-blue-500 py-2 px-3 mt-3  text-white rounded-md">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
