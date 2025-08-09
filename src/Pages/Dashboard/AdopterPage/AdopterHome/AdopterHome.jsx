import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const AdopterHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "ResQPet | Adopter Home";
  }, []);

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["adopter-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/adopter-stats?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: approvedSubmissions = [], isLoading: approvedLoading } =
    useQuery({
      queryKey: ["approved-submissions", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/dashboard/approved-submissions?email=${user.email}`
        );
        return res.data;
      },
      enabled: !!user?.email,
    });

  if (statsLoading || approvedLoading) return <LoadingPage />;

  const {
    totalSubmissions = 0,
    pendingSubmissions = 0,
    favouritePetsCount = 0,
  } = stats;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Submissions</h3>
          <p className="text-3xl font-bold text-blue-600">{totalSubmissions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Pending Submissions</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {pendingSubmissions}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Favourite Pets</h3>
          <p className="text-3xl font-bold text-green-500">
            {favouritePetsCount}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-xl font-bold mb-4">Submission Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Total", value: totalSubmissions },
              { name: "Pending", value: pendingSubmissions },
              { name: "Favourite", value: favouritePetsCount },
              { name: "Approved", value: approvedSubmissions.length },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Approved Adoptions</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="text-lg text-black">
              <tr>
                <th>Image</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Location</th>
                <th>Status</th>
                <th>Favourites</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {approvedSubmissions.map((pet) => (
                <tr key={pet._id}>
                  <td>
                    <img
                      src={pet.image}
                      alt={pet.species}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td>{pet.species}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.age}</td>
                  <td>{pet.location}</td>
                  <td>
                    <span className={"badge capitalize badge-success"}>
                      {pet.status}
                    </span>
                  </td>
                  <td>{pet.favourites?.length || 0}</td>
                </tr>
              ))}
              {approvedSubmissions.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No approved adoptions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdopterHome;
