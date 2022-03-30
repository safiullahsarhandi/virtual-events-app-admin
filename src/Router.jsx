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
import AttributeLog from "./Screens/Attribute/AtrributeLog";
import AddAttribute from "./Screens/Attribute/AddAttribute";
import ViewAttribute from "./Screens/Attribute/ViewAttribute";
import NotFound from "./Screens/NotFound/NotFound";
import ProductLog from "./Screens/Product/ProductLog";
import AddProduct from "./Screens/Product/AddProduct";
import ViewProduct from "./Screens/Product/ViewProduct";
import OrderLog from "./Screens/Order/OrderLog";
import ViewOrder from "./Screens/Order/ViewOrder";
import PaymentLog from "./Screens/Payment/PaymentLog";
import FeedbackLogs from "./Screens/Feedback/FeedbackLogs";
import FeedbackDetails from "./Screens/Feedback/FeedbackDetails";
import StoryCategoryLog from "./Screens/StoryCategory/StoryCategoryLog";
import AddStoryCategory from "./Screens/StoryCategory/AddStoryCategory";
import StoryLog from "./Screens/Story/StoryLog";
import ViewStory from "./Screens/Story/ViewStory";
import EventCategory from "./Screens/EventCategory/EventCategory";
import AddEventCategory from "./Screens/EventCategory/AddEventCategory";

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
        <Route
          path="/attribute/logs"
          element={
            <PrivateRoutes title="Attribute">
              <AttributeLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/attribute/add"
          element={
            <PrivateRoutes title="Attribute">
              <AddAttribute />
            </PrivateRoutes>
          }
        />
        <Route
          path="/attribute/details/:id"
          element={
            <PrivateRoutes title="Attribute">
              <ViewAttribute />
            </PrivateRoutes>
          }
        />
        <Route
          path="/attribute/edit/:id"
          element={
            <PrivateRoutes title="Attribute">
              <AddAttribute />
            </PrivateRoutes>
          }
        />
        <Route
          path="/product/logs"
          element={
            <PrivateRoutes title="Products">
              <ProductLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/product/add"
          element={
            <PrivateRoutes title="Products">
              <AddProduct />
            </PrivateRoutes>
          }
        />
        <Route
          path="/product/edit/:id"
          element={
            <PrivateRoutes title="Products">
              <AddProduct />
            </PrivateRoutes>
          }
        />
        <Route
          path="/product/details/:id"
          element={
            <PrivateRoutes title="Products">
              <ViewProduct />
            </PrivateRoutes>
          }
        />
        <Route
          path="/order/logs"
          element={
            <PrivateRoutes title="Orders">
              <OrderLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/order/details/:id"
          element={
            <PrivateRoutes title="Orders">
              <ViewOrder />
            </PrivateRoutes>
          }
        />
        <Route
          path="/payment/logs"
          element={
            <PrivateRoutes title="Payment">
              <PaymentLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/feedback/logs"
          element={
            <PrivateRoutes title="Feedback">
              <FeedbackLogs />
            </PrivateRoutes>
          }
        />
        <Route
          path="/feedback/details/:id"
          element={
            <PrivateRoutes title="Feedback">
              <FeedbackDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/story-category/logs"
          element={
            <PrivateRoutes title="Story Category">
              <StoryCategoryLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/story-category/add"
          element={
            <PrivateRoutes title="Story Category">
              <AddStoryCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/story-category/edit/:id"
          element={
            <PrivateRoutes title="Story Category">
              <AddStoryCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/story/logs"
          element={
            <PrivateRoutes title="Stories">
              <StoryLog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/story/details/:id"
          element={
            <PrivateRoutes title="Stories">
              <ViewStory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/event-category/logs"
          element={
            <PrivateRoutes title="Event Category">
              <EventCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/event-category/add"
          element={
            <PrivateRoutes title="Event Category">
              <AddEventCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/event-category/edit/:id"
          element={
            <PrivateRoutes title="Event Category">
              <AddEventCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoutes title="Not Found">
              <NotFound />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
}
