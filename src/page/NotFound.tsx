import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <Link to={"/user"}>User</Link>
      <Link to={"/admin"}>admin</Link>
      <p>404</p>
    </div>
  );
}
