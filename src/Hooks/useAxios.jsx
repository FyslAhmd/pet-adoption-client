import axios from "axios";
import React from "react";

const axiosIns = axios.create({
  baseURL: "https://pet-adoption-server-42bi.onrender.com",
});

const useAxios = () => {
  return axiosIns;
};

export default useAxios;
