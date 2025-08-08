import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import UpdatePetModal from "./UpdatePetModal";

const MyPets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    document.title = "Daily Gigs | My Pets";
  }, []);

  const { data: pets = [], refetch } = useQuery({
    queryKey: ["my-pets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets?rescuer_email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (pet) => {
    const { _id } = pet;

    Swal.fire({
      title: "Are you sure?",
      text: "This pet profile will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/pets/${_id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Pet profile has been deleted.", "success");
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">My Pets</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead className="bg-gray-100 text-base text-black">
            <tr>
              <th>Photo</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {pets.map((pet) => (
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
                      pet.status === "adopted"
                        ? "bg-gray-500 text-white"
                        : "bg-green-700 text-white"
                    }`}
                  >
                    {pet.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => setSelectedPet(pet)}
                    className="btn btn-primary btn-sm text-black"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(pet)}
                    className="btn bg-red-700 btn-sm text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pets.length === 0 && (
          <div className="text-center mt-10 text-gray-500">
            You haven't added any pets yet.
          </div>
        )}
      </div>

      {selectedPet && (
        <UpdatePetModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MyPets;
