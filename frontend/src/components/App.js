import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import NutritionList from "./nutrition-logs";
import { AuthRoute, ProtectedRoute } from "../util/route";
import CreateNutrition from "./create-nutrition";
import EditNutrition from "./edit-nutrition";
import Profile from "./profile";
import Dashboard from "./dashboard";
import Donate from "./donate";

export default () => (
  <>
    <AuthRoute path="/login" component={Login} />
    <AuthRoute path="/signup" component={Signup} />
    <ProtectedRoute path="/dashboard" component={Dashboard} />
    <ProtectedRoute path="/nutrition-logs" component={NutritionList} />
    <ProtectedRoute path="/create-log" component={CreateNutrition} />
    <ProtectedRoute path="/edit-log" component={EditNutrition} />
    <ProtectedRoute path="/profile" component={Profile} />    
    <ProtectedRoute path="/donate" component={Donate} />
  </>
);