import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const MyAdoptions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    document.title = "Pet Adoption | My Requests";
  }, []);

  const { data: adoptionData = {}, isLoading } = useQuery({
    queryKey: ["my-adoptions", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions/${user.email}?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!user?.email,
  });

  const { adoptions = [], totalPages = 0 } = adoptionData;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Adoption Requests
      </h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table table-zebra w-full">
          <thead className="text-lg text-black">
            <tr>
              <th>#</th>
              <th>Species</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Rescuer Email</th>
            </tr>
          </thead>
          <tbody className="text-base font-medium">
            {adoptions.map((adoption, index) => (
              <tr key={adoption._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{adoption.species}</td>
                <td>
                  {new Date(adoption.adoption_requested_at).toLocaleString()}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      adoption.status === "pending"
                        ? "bg-yellow-400 text-black"
                        : adoption.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-400 text-black"
                    }`}
                  >
                    {adoption.status}
                  </span>
                </td>
                <td>{adoption.rescuer_email || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {adoptions.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No adoption requests yet.
          </p>
        )}

        <div className="flex justify-center gap-4 my-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="btn btn-sm btn-outline"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="btn btn-sm btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAdoptions;
