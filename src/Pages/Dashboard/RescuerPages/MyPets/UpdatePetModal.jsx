import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const speciesOptions = ["Dog", "Cat", "Rabbit", "Bird", "Other"];
const genderOptions = ["Male", "Female", "Unknown"];
const yesNoOptions = ["yes", "no"];

const UpdatePetModal = ({ pet, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({});
  console.log(pet);
  useEffect(() => {
    if (pet) {
      setFormData({
        species: pet.species,
        breed: pet.breed || "",
        age: pet.age || "",
        gender: pet.gender || "",
        size: pet.size || "",
        color: pet.color || "",
        vaccinated: pet.vaccinated || "",
        spayed_neutered: pet.spayed_neutered || "",
        medical_notes: pet.medical_notes || "",
        temperament_kids: pet.temperament_kids || "",
        temperament_pets: pet.temperament_pets || "",
        biography: pet.biography || "",
        status: pet.status || "available",
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.patch(`/pets/${pet._id}`, formData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Pet profile updated successfully.", "success");
        refetch();
        onClose();
      } else {
        Swal.fire("No changes made", "", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <dialog
      id="update_pet_modal"
      open
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg text-center mb-4">
          Update Pet Profile
        </h3>

        <div className="space-y-3">
          {/* Species */}
          <div>
            <label className="label">Species</label>
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Species
              </option>
              {speciesOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Breed */}
          <div>
            <label className="label">Breed</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Breed"
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Age in years"
              min={0}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Gender
              </option>
              {genderOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="label">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g. Small, Medium, Large"
            />
          </div>

          {/* Color */}
          <div>
            <label className="label">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Color"
            />
          </div>

          {/* Vaccinated */}
          <div>
            <label className="label">Vaccinated</label>
            <select
              name="vaccinated"
              value={formData.vaccinated}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Option
              </option>
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Spayed/Neutered */}
          <div>
            <label className="label">Spayed/Neutered</label>
            <select
              name="spayed_neutered"
              value={formData.spayed_neutered}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Option
              </option>
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Medical Notes */}
          <div>
            <label className="label">Medical Notes</label>
            <textarea
              name="medical_notes"
              value={formData.medical_notes}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Medical notes"
            />
          </div>

          {/* Temperament (Good with kids) */}
          <div>
            <label className="label">Good with Kids</label>
            <select
              name="temperament_kids"
              value={formData.temperament_kids}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Option
              </option>
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Temperament (Good with other pets) */}
          <div>
            <label className="label">Good with Other Pets</label>
            <select
              name="temperament_pets"
              value={formData.temperament_pets}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Option
              </option>
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Biography */}
          <div>
            <label className="label">Biography / Description</label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Write a brief description about the pet"
            />
          </div>
        </div>

        <div className="modal-action">
          <button onClick={handleUpdate} className="btn btn-primary text-black">
            Update
          </button>
          <button onClick={onClose} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdatePetModal;
