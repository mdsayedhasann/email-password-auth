import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../firebase/firebase.init";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/Ai";
import { Link } from "react-router-dom";

const Register = () => {
  const [registeredError, setRegisteredError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    // Reset Error
    setRegisteredError("");
    setRegisterSuccess("");

    if (password.length < 6) {
      setRegisteredError("Please Enter a password more than 6 charecter");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisteredError("Please Enter at least one Uppercase");
      return;
    } else if (!/[0-9]/.test(password)) {
      setRegisteredError("Please put at least one number");
      return;
    } else if (!/[!,@,#,$,%,&,*]/.test(password)) {
      setRegisteredError("Please Enter at least one charecter");
      return;
    } else if (accepted === false) {
      setRegisteredError("Please accepted our Terms & Conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const reg = userCredential.user;
        console.log(reg);
        setRegisterSuccess(reg);

        sendEmailVerification(userCredential.user)
          .then(() => {
            console.log("Email Verified message send");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        console.error(error);
        setRegisteredError(error.message);
      });
    console.log("Registered");
    e.target.email.value = "";
    e.target.password.value = "";
  };
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
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      name="password"
                      className="input input-bordered w-full"
                      required
                    />
                    <span
                      className="absolute right-3 top-[35%]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>

                  {/* <span onClick={setShowPassword(!showPassword)}>Show</span> */}
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>

                  <div className="flex gap-1 mt-5">
                    <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">
                      Accept Our <a href="#">Terms & Conditions</a>{" "}
                    </label>
                  </div>

                  <input
                    className="btn btn-primary text-white mt-4"
                    type="submit"
                    value="Register"
                  />
                </div>
              </div>
            </form>
            {registeredError && (
              <p className="text-red-600"> {registeredError} </p>
            )}
            {registerSuccess && (
              <p className="text-green-600 text-xl">
                Registration Successfull {registerSuccess.email}{" "}
              </p>
            )}
            <p>Already have an account?</p>
            <Link to={"/login"}>
              <button className="bg-blue-500 py-2 px-3 mt-3  text-white rounded-md">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
