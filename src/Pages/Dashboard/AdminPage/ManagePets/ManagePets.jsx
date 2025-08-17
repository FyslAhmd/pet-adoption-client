import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const ManagePets = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    document.title = "ResQPet | Manage Pets";
  }, []);

  const {
    data: pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets/all");
      return res.data;
    },
  });

  const handleDeletePet = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This pet will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/pets/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Pet has been removed.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete the pet.", "error");
      }
    }
  };

  if (isLoading) return <LoadingPage />;

  const filteredPets = pets.filter((pet) =>
    pet.rescuer_email?.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Pets</h2>

      {/* Search Input */}
      <div className="mb-4 max-w-sm ml-auto">
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border border-gray-400 p-2 w-full rounded-full"
          placeholder="Search by email..."
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table w-full table-zebra">
          <thead className="text-lg text-black bg-gray-100">
            <tr>
              <th>Photo</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <tr key={pet._id}>
                  <td>
                    <img
                      src={pet.image}
                      alt={pet.species}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{pet.species}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.gender}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pet.status === "approved"
                          ? "bg-gray-500 text-white"
                          : "bg-green-700 text-white"
                      }`}
                    >
                      {pet.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeletePet(pet._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-red-500 py-4">
                  No pets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePets;
