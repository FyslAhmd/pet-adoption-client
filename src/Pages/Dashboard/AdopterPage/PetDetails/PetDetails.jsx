import React from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: pet,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/${id}`);
      return res.data;
    },
  });

  const handleAdopt = async () => {
    Swal.fire({
      title: "Confirm Adoption",
      text: "Do you want to adopt?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Adopt",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/pets/adopt/${pet._id}`, {
          adopterEmail: user?.email,
        });
        Swal.fire("Request Sent!", "Pet status updated to pending.", "success");
        refetch();
      }
    });
  };

  if (!pet || isLoading) return <LoadingPage />;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Pet Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
        {/* Pet Image */}
        <div>
          <img
            src={pet.image}
            alt={pet.species}
            className="w-full h-[350px] object-cover rounded-lg"
          />
        </div>

        {/* Pet Info */}
        <div className="space-y-3 text-lg">
          <p>
            <span className="font-semibold">Species:</span> {pet.species}
          </p>
          <p>
            <span className="font-semibold">Breed:</span> {pet.breed}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {pet.age} years
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {pet.gender}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {pet.size}
          </p>
          <p>
            <span className="font-semibold">Color:</span> {pet.color}
          </p>
          <p>
            <span className="font-semibold">Vaccinated:</span> {pet.vaccinated}
          </p>
          <p>
            <span className="font-semibold">Spayed/Neutered:</span>{" "}
            {pet.spayed_neutered}
          </p>
          <p>
            <span className="font-semibold">Medical Notes:</span>{" "}
            {pet.medical_notes}
          </p>
          <p>
            <span className="font-semibold">Good with Kids:</span>{" "}
            {pet.temperament_kids}
          </p>
          <p>
            <span className="font-semibold">Good with Other Pets:</span>{" "}
            {pet.temperament_pets ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Biography:</span> {pet.biography}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {pet.location}
          </p>
          <p>
            <span className="font-semibold">Rescuer:</span> {pet.rescuer_name} (
            {pet.rescuer_email})
          </p>
        </div>
      </div>

      {/* Adopt Button */}
      <div className="flex justify-center mt-8">
        {pet.status === "available" ? (
          <button
            onClick={handleAdopt}
            className="btn bg-primary text-xl text-black font-bold px-24 rounded-full"
          >
            Adopt Pet
          </button>
        ) : (
          <p className="text-red-500 font-semibold">
            {pet.status === "pending"
              ? "Adoption request is pending"
              : "Pet already adopted"}
          </p>
        )}
      </div>
    </div>
  );
};

export default PetDetails;
