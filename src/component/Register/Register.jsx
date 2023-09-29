
import {  createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../firebase/firebase.init";
import { useState } from "react";

const Register = () => {

    const [registeredError, setRegisteredError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState('')
    
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        // Reset Error 
        setRegisterSuccess('')
        setRegisterSuccess('')

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const reg = userCredential.user
            console.log(reg);
            setRegisterSuccess(reg)
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
            setRegisteredError(error.message)
        })
        console.log('Registered');
        e.target.email.value = ''
        e.target.password.value = ''
    }
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-14">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email" name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password" name="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <input className="btn btn-primary text-white mt-4" type="submit" value='Register' />
              </div>
            </div>
            </form>
            {
                registeredError && 
                <p className="text-red-600"> {registeredError} </p>
            }
            {
                registerSuccess && 
                <p className="text-green-600 text-xl">Registration Successfull {registerSuccess.email} </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
