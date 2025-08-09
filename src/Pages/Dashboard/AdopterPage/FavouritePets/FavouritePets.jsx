import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import useAuth from "../../../../Hooks/useAuth"; // assuming you have auth hook

const FavouritePets = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Pet Rescue | My Favourites";
  }, []);

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["favourite-pets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/favourites`, {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="mx-auto p-6 max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-8">My Favourite Pets</h2>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition cursor-pointer"
            >
              <div className="flex flex-col h-full">
                <img
                  src={pet.image}
                  alt={`${pet.species} - ${pet.breed}`}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="flex-1 px-2 py-3">
                  <h3 className="text-xl font-semibold mb-2">
                    {pet.species} - {pet.breed}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Age:</strong> {pet.age || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Location:</strong> {pet.location || "Unknown"}
                  </p>
                </div>
                <div className="p-4 pt-0">
                  <button
                    onClick={() => navigate(`/dashboard/pets/${pet._id}`)}
                    className="btn btn-primary w-full rounded-full text-black"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            You have no favourite pets yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default FavouritePets;
