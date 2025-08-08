import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const BrowsePets = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    document.title = "Pet Rescue | Available Pets";
  }, []);

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["available-pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets/available");
      return res.data;
    },
  });

  // First filter by location (search bar)
  let filteredPets = pets.filter((pet) =>
    pet.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Then apply advanced filter
  if (filterOption === "ageLowHigh") {
    filteredPets = [...filteredPets].sort(
      (a, b) => (a.age || 0) - (b.age || 0)
    );
  } else if (filterOption === "ageHighLow") {
    filteredPets = [...filteredPets].sort(
      (a, b) => (b.age || 0) - (a.age || 0)
    );
  } else if (filterOption === "genderFemale") {
    filteredPets = filteredPets.filter(
      (pet) => pet.gender?.toLowerCase() === "female"
    );
  } else if (filterOption === "genderMale") {
    filteredPets = filteredPets.filter(
      (pet) => pet.gender?.toLowerCase() === "male"
    );
  } else if (filterOption === "sizeSmall") {
    filteredPets = filteredPets.filter(
      (pet) => pet.size?.toLowerCase() === "small"
    );
  } else if (filterOption === "sizeMedium") {
    filteredPets = filteredPets.filter(
      (pet) => pet.size?.toLowerCase() === "medium"
    );
  } else if (filterOption === "sizeLarge") {
    filteredPets = filteredPets.filter(
      (pet) => pet.size?.toLowerCase() === "large"
    );
  }

  if (isLoading) return <LoadingPage />;

  return (
    <div className="mx-auto p-6 max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-8">
        Available Pets for Adoption
      </h2>

      {/* Search bar and filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        {/* Search */}
        <div className="flex items-center bg-gray-200 rounded-full overflow-hidden shadow-sm w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by location..."
            className="flex-grow px-4 py-2 bg-gray-200 focus:outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary text-black rounded-full px-6">
            Search
          </button>
        </div>

        {/* Advanced filter */}
        <div>
          <select
            className="border border-gray-400 p-2 w-full rounded-full"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="">All</option>
            <option value="ageLowHigh">Age: Low → High</option>
            <option value="ageHighLow">Age: High → Low</option>
            <option value="genderFemale">Gender: Female</option>
            <option value="genderMale">Gender: Male</option>
            <option value="sizeSmall">Size: Small</option>
            <option value="sizeMedium">Size: Medium</option>
            <option value="sizeLarge">Size: Large</option>
          </select>
        </div>
      </div>

      {/* Pets grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
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
            No pets found for your search/filter
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowsePets;
