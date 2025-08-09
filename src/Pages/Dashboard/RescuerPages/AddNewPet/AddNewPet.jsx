import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const speciesOptions = ["Dog", "Cat", "Rabbit", "Bird", "Other"];
const genderOptions = ["Male", "Female", "Unknown"];
const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const AddNewPet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [petImage, setPetImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  useEffect(() => {
    document.title = "Pet Rescue | Add Pet Profile";

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
          });
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await res.json();
      setPetImage(imgData.secure_url);
    } catch (err) {
      console.error("Image Upload Failed", err);
      Swal.fire("Image upload failed", "", "error");
    }
    setUploading(false);
  };

  const onSubmit = async (data) => {
    if (!petImage) {
      Swal.fire("Please upload a pet photo", "", "warning");
      return;
    }

    const petInfo = {
      species: data.species,
      breed: data.breed,
      age: data.age,
      gender: data.gender,
      size: data.size,
      color: data.color,
      vaccinated: data.vaccinated,
      spayed_neutered: data.spayed_neutered,
      medical_notes: data.medical_notes,
      temperament_kids: data.temperament_kids,
      temperament_pets: data.temperament_pets,
      biography: data.biography,
      location: data.location,
      coordinates: coordinates,
      image: petImage,
      status: "available",
      rescuer_name: user?.displayName,
      rescuer_email: user?.email,
      created_at: new Date().toISOString(),
    };

    try {
      const petRes = await axiosSecure.post("/pets", petInfo);
      if (petRes.data.insertedId) {
        Swal.fire("Pet Profile Added Successfully!", "", "success");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Pet Profile Submission Error:", error);
      Swal.fire("Something went wrong!", "", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        Add New Pet Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Species & Breed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Species</label>
            <select
              {...register("species", { required: "Species is required" })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Select species
              </option>
              {speciesOptions.map((sp) => (
                <option key={sp} value={sp}>
                  {sp}
                </option>
              ))}
            </select>
            {errors.species && (
              <p className="text-red-500 text-sm">{errors.species.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Breed</label>
            <input
              type="text"
              {...register("breed", { required: "Breed is required" })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="Breed of the pet"
            />
            {errors.breed && (
              <p className="text-red-500 text-sm">{errors.breed.message}</p>
            )}
          </div>
        </div>

        {/* Age, Gender, Size, Color */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="text"
              {...register("age", { required: "Age is required" })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="e.g. 2 years"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Select gender
              </option>
              {genderOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Size</label>
            <input
              type="text"
              {...register("size", { required: "Size is required" })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="Small, Medium, Large"
            />
            {errors.size && (
              <p className="text-red-500 text-sm">{errors.size.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Color</label>
            <input
              type="text"
              {...register("color", { required: "Color is required" })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="Pet's color"
            />
            {errors.color && (
              <p className="text-red-500 text-sm">{errors.color.message}</p>
            )}
          </div>
        </div>

        {/* Health Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium mb-1">Vaccinated</label>
            <select
              {...register("vaccinated", { required: true })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Select option
              </option>
              {yesNoOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Spayed/Neutered</label>
            <select
              {...register("spayed_neutered", { required: true })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Select option
              </option>
              {yesNoOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Medical Notes</label>
            <input
              type="text"
              {...register("medical_notes")}
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="Any health conditions"
            />
          </div>
        </div>

        {/* Temperament */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Good with Kids</label>
            <select
              {...register("temperament_kids", { required: true })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Select option
              </option>
              {yesNoOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">
              Good with Other Pets
            </label>
            <select
              {...register("temperament_pets", { required: true })}
              className="border border-gray-400 p-2 w-full rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Select option
              </option>
              {yesNoOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Biography */}
        <div>
          <label className="block font-medium mb-1">
            Biography / Description
          </label>
          <textarea
            {...register("biography", { required: "Biography is required" })}
            className="border border-gray-400 p-2 w-full h-32 rounded-lg"
            placeholder="Write something about the pet..."
          />
          {errors.biography && (
            <p className="text-red-500 text-sm">{errors.biography.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location (Address)</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="border border-gray-400 p-2 w-full rounded-lg"
            placeholder="Address of the pet's location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Coordinates (auto detected) */}
        <div>
          <label className="block font-medium mb-1">
            Coordinates (Latitude, Longitude)
          </label>
          <input
            type="text"
            defaultValue={
              coordinates.lat && coordinates.lng
                ? `${coordinates.lat}, ${coordinates.lng}`
                : ""
            }
            className="border border-gray-400 p-2 w-full rounded-lg bg-gray-100"
            placeholder="Automatically detected coordinates"
          />
          {!coordinates.lat && !coordinates.lng && (
            <p className="text-yellow-600 text-sm mt-1">
              Unable to detect location. Please enable location services.
            </p>
          )}
        </div>

        {/* Upload Photo */}
        <div>
          <label className="block font-medium mb-1">Upload Pet Photo</label>
          <label className="cursor-pointer inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg border border-blue-300 hover:bg-blue-200 transition">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {uploading && (
            <p className="text-blue-500 text-sm mt-1">Uploading...</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary text-black mt-4 w-full text-lg"
          disabled={uploading}
        >
          {uploading ? "Uploading Image..." : "Add Pet Profile"}
        </button>
      </form>
    </div>
  );
};

export default AddNewPet;
