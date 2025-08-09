import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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
    onSuccess: (data) => {
      if (data?.favourites?.includes(user?.email)) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
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

  const isFavourite = pet?.favourites?.includes(user?.email);
  const handleToggleFavourite = async () => {
    try {
      const res = await axiosSecure.patch(`/pets/favourite/${pet._id}`, {
        userEmail: user?.email,
      });
      Swal.fire("Success", res.data.message, "success");
      await refetch();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!pet || isLoading) return <LoadingPage />;

  const lat = pet?.coordinates?.lat || 0;
  const lng = pet?.coordinates?.lng || 0;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Pet Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
        {/* Pet Image + Map */}
        <div>
          <img
            src={pet.image}
            alt={pet.species}
            className="w-full h-[350px] object-cover rounded-lg"
          />

          {lat && lng ? (
            <div className="mt-4 rounded-lg overflow-hidden border border-gray-300">
              <MapContainer
                center={[lat, lng]}
                zoom={15}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                  <Popup>
                    <div>
                      <strong>
                        {pet.species} - {pet.breed}
                      </strong>
                      <br />
                      Location: {pet.location}
                      <br />
                      Age: {pet.age} years
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <p className="mt-4 text-red-500">No coordinates available</p>
          )}
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

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        {pet.status === "available" ? (
          <button
            onClick={handleAdopt}
            className="btn bg-primary text-xl text-black font-bold px-8 rounded-full"
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

        {/* Favourite Button */}
        <button
          onClick={handleToggleFavourite}
          className={`btn text-xl font-bold px-8 rounded-full ${
            isFavourite ? "bg-red-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {isFavourite ? "Remove Favourite" : "Add to Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PetDetails;
