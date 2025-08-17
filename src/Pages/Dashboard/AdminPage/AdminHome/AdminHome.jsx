import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "ResQPet | Admin Home";
  }, []);

  const {
    data: stats = {},
    isLoading,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  const pieData = [
    { name: "Adopter", value: stats.totalAdopter || 0 },
    { name: "Rescuer", value: stats.totalRescuer || 0 },
    { name: "Admin", value: stats.totalAdmin || 0 },
  ];
  const COLORS = ["#8884d8", "#82ca9d", "#393939"];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, Admin</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Adopter</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalAdopter}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Rescuer</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalRescuer}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Pets</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.totalPets}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Available Pets</h3>
          <p className="text-3xl font-bold text-red-600">
            {stats.availablePets}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-xl font-bold mb-4">User Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
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
    </div>
  );
};

export default AdminHome;
