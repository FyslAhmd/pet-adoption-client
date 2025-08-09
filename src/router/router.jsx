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
import MyAdoptions from "../Pages/Dashboard/AdopterPage/MySubmission/MySubmission";
import FavouritePets from "../Pages/Dashboard/AdopterPage/FavouritePets/FavouritePets";
import Error404 from "../Pages/Shared/Error404/Error404";
import ManageUsers from "../Pages/Dashboard/AdminPage/ManageUsers/ManageUsers";
import ManagePets from "../Pages/Dashboard/AdminPage/ManagePets/ManagePets";
import PrivateRoute from "../Routes/PrivateRoute";
import Forbidden from "../Pages/Shared/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import AdopterRoute from "../Routes/AdopterRoute";
import RescuerRoute from "../Routes/RescuerRoute";

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
      {
        path: "/forbidden",
        Component: Forbidden,
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
    element: (
      <PrivateRoute>
        <Dashboardlayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "addNewPet",
        element: (
          <RescuerRoute>
            <AddNewPet />
          </RescuerRoute>
        ),
      },
      {
        path: "myPets",
        element: (
          <RescuerRoute>
            <MyPets />
          </RescuerRoute>
        ),
      },
      {
        path: "browsePet",
        element: (
          <AdopterRoute>
            <BrowsePets />
          </AdopterRoute>
        ),
      },
      {
        path: "pets/:id",
        element: (
          <AdopterRoute>
            <PetDetails />
          </AdopterRoute>
        ),
      },
      {
        path: "mySubmissions",
        element: (
          <AdopterRoute>
            <MyAdoptions />
          </AdopterRoute>
        ),
      },
      {
        path: "favouritePets",
        element: (
          <AdopterRoute>
            <FavouritePets />
          </AdopterRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "managePets",
        element: (
          <AdminRoute>
            <ManagePets />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: Error404,
  },
]);

export default router;
