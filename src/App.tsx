import React from "react";
import Dashboard from "./page/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import User from "./page/User";
import ProtectedRoute from "./component/protect";
import Admin from "./page/Admin";
import NotFound from "./page/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
