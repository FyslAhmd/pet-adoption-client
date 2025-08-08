import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import About from "../Pages/About/About";
import Dashboardlayout from "../Layout/Dashboardlayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddNewPet from "../Pages/Dashboard/RescuerPages/AddNewPet/AddNewPet";
import MyPets from "../Pages/Dashboard/RescuerPages/MyPets/MyPets";
import BrowsePets from "../Pages/Dashboard/AdopterPage/BrowsePets/BrowsePets";
import PetDetails from "../Pages/Dashboard/AdopterPage/PetDetails/PetDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboardlayout />,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "addNewPet",
        element: <AddNewPet />,
      },
      {
        path: "myPets",
        element: <MyPets />,
      },
      {
        path: "browsePet",
        element: <BrowsePets />,
      },
      {
        path: "pets/:id",
        element: <PetDetails />,
      },
    ],
  },
]);

export default router;
