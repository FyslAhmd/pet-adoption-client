import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Swal from "sweetalert2";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const RescuerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    document.title = "ResQPet | Rescuer Home";
  }, []);

  const {
    data: stats = {},
    isLoading,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ["rescuer-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/rescuer-stats?email=${user.email}`
      );
      return res.data;
    },
  });

  const { data: reviewPets = [], refetch } = useQuery({
    queryKey: ["review-submissions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/review-submissions?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingPage />;

  const handleApprove = async (submissionId) => {
    try {
      await axiosSecure.patch(`/dashboard/approve-submission/${submissionId}`);
      Swal.fire("Approved!", "Submission approved successfully.", "success");
      refetch();
      refetchStats();
    } catch {
      Swal.fire("Error", "Failed to approve submission", "error");
    }
  };

  const handleReject = async (submissionId, taskId) => {
    try {
      await axiosSecure.patch(`/dashboard/reject-submission/${submissionId}`, {
        taskId,
      });
      Swal.fire("Rejected!", "Submission rejected successfully.", "success");
      refetch();
      refetchStats();
    } catch {
      Swal.fire("Error", "Failed to reject submission", "error");
    }
  };

  const pieData = [
    { name: "Total Pets", value: stats.totalPets || 0 },
    { name: "Available Pets", value: stats.availablePets || 0 },
    { name: "Total Favourite", value: stats.totalFavourites || 0 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Pets</h3>
          <p className="text-3xl text-blue-600 font-bold">{stats.totalPets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Available Pets</h3>
          <p className="text-3xl text-yellow-500 font-bold">
            {stats.availablePets}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Favourite</h3>
          <p className="text-3xl text-green-600 font-bold">
            {stats.totalFavourites}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h3 className="text-xl font-bold mb-4">Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Pets to Review</h3>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="table table-zebra w-full">
            <thead className="text-lg text-black">
              <tr>
                <th>Adopter</th>
                <th>Species</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {reviewPets.map((pet) => (
                <tr key={pet._id}>
                  <td>{pet.adopter_email || "N/A"}</td>
                  <td>{pet.species}</td>
                  <td
                    className={
                      pet.status === "pending"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {pet.status}
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedPet(pet)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleApprove(pet._id)}
                      className="btn btn-sm btn-success text-black"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(pet._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedPet && (
        <dialog
          id="pet_modal"
          open
          className="modal"
          onClose={() => setSelectedPet(null)}
        >
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-2">Adoption Request</h3>
            <p className="mb-2">
              <strong>Pet Name:</strong> {selectedPet.name}
            </p>
            <p className="mb-2">
              <strong>Breed:</strong> {selectedPet.breed}
            </p>
            <p className="mb-2">
              <strong>Age:</strong> {selectedPet.age} years
            </p>
            <p className="mb-2">
              <strong>Gender:</strong> {selectedPet.gender}
            </p>
            <hr className="my-2" />
            <p className="mb-2">
              <strong>Adopter Name:</strong> {selectedPet.adopter_name}
            </p>
            <p className="mb-2">
              <strong>Adopter Email:</strong> {selectedPet.adopter_email}
            </p>
            <p className="mb-4">
              <strong>Message:</strong>{" "}
              {selectedPet.adopter_message || "No message"}
            </p>
            <div className="modal-action">
              <button
                onClick={() => setSelectedPet(null)}
                className="btn btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RescuerHome;
