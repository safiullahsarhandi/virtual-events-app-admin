import React from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";

// SCREENS
import Login from "./Screens/Login/Login";
import Recover from "./Screens/Login/Recover";
import Dashboard from "./Screens/Dashboard/Dashboard";
import Profile from "./Screens/Profile/Profile";
import ChangePassword from "./Screens/Profile/ChangePassword";
import UserLog from "./Screens/User/UserLog";
import UserDetails from "./Screens/User/UserDetails";
import SubscriptionLog from "./Screens/Subscription/SubscriptionLog";
import CategoryLog from "./Screens/Category/CategoryLog";
import AddSubCategory from "./Screens/Category/AddSubCategory";
import AddMainCategory from "./Screens/Category/AddMainCategory";
import ViewCategory from "./Screens/Category/ViewCategory";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recover" element={<Recover />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes title="Dashboard">
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes title="Profile">
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile/change-password"
          element={
            <PrivateRoutes title="Profile - Change Password">
              <ChangePassword />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/logs"
          element={
            <PrivateRoutes title="User">
              <UserLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user/details/:id"
          element={
            <PrivateRoutes title="User">
              <UserDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/subscription/logs"
          element={
            <PrivateRoutes title="Subscription">
              <SubscriptionLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/category/logs"
          element={
            <PrivateRoutes title="Category">
              <CategoryLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/category/add/sub-category"
          element={
            <PrivateRoutes title="Sub Category">
              <AddSubCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/category/add/main-category"
          element={
            <PrivateRoutes title="Main Category">
              <AddMainCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/category/edit/main-category/:id"
          element={
            <PrivateRoutes title="Main Category">
              <AddMainCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/category/details/:id"
          element={
            <PrivateRoutes title="Category">
              <ViewCategory />
            </PrivateRoutes>
          }
        />

        {/* <Route
          path="/*"
          element={
            <PrivateRoutes title="Not Found">
              <NotFound />
            </PrivateRoutes>
          }
        /> */}
      </Routes>
    </>
  );
}
