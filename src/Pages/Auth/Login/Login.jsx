import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosIns = useAxios();

  useEffect(() => {
    document.title = "ResQPet | Login";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(async (res) => {
        console.log(res.user);
        toast.success("Login Successfull");
        // await axiosIns.patch("/users/last-login", {
        //   email: data.email,
        // });
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        toast.error("Login failed. Please try again.");
      });
  };

  return (
    <div className="font-inter space-y-4">
      <h1 className="font-extrabold text-4xl">Welcome Back</h1>
      <p className="">Login with ResQPet</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-400 p-2 w-full rounded-lg"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-500 mt-1">
                Email is required
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-400 p-2 w-full rounded-lg"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-500 mt-1">
                Password is required
              </p>
            )}
          </div>
          <button className="btn btn-primary text-black mt-4">Login</button>
        </fieldset>
        <p className="my-2">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="font-extrabold text-accent">Register</span>
          </Link>
        </p>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
