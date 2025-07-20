import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import regLogo from "../../../assets/image-upload-icon.png";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const axiosIns = useAxios();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  const [emailExists, setEmailExists] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    document.title = "ResQPet | Register";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!profilePic) {
      toast.error("Please upload a profile picture.");
      return;
    }

    try {
      await createUser(data.email, data.password)
        .then((res) => {
          toast.success("Registration Successfull");
          console.log(res.user);
        })
        .catch((error) => {
          console.error(error);
          if (error.code === "auth/email-already-in-use") {
            setEmailExists(true);
            toast.error("Email already registered. Try logging in.");
          } else {
            setEmailExists(false);
            toast.error("Registration failed. Please try again.");
          }
        });

      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role,
        profilePic,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      console.log(userInfo);
        await axiosIns.post("/users", userInfo);
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    setImageUploading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );
      setProfilePic(res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <div className="font-inter space-y-4">
      <h1 className="font-extrabold text-4xl">Create an Account</h1>
      <p className="">Register with ResQPet</p>
      <div className="relative mb-4">
        <div
          className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border border-gray-300 flex items-center justify-center"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {imageUploading ? (
            <span className="loading loading-spinner text-primary w-6 h-6"></span>
          ) : (
            <img
              src={profilePic || regLogo}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          required
        />
        {!profilePic && (
          <p className="text-sm text-red-500 mt-1">
            Profile picture is required
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset space-y-4">
          <div>
            <label className="font-medium">Name</label>
            <input
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            {emailExists && (
              <p className="text-red-500 text-sm">Email already registered</p>
            )}
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              className="border border-gray-400 p-2 w-full rounded-lg"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: "Include uppercase, number & special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="font-medium">Register As</label>
            <select
              className="border border-gray-400 p-2 w-full rounded-lg"
              defaultValue=""
              {...register("role", { required: "Role is required" })}
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="adopter">Adopter</option>
              <option value="rescuer">Rescuer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary text-black mt-4">
            Register
          </button>
        </fieldset>

        <p className="my-2">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-extrabold text-accent">Login</span>
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
