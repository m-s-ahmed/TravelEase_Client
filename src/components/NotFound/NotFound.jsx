import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-extrabold">404</h1>
        <p className="mt-3 text-xl font-semibold">Page not found</p>
        <p className="mt-2 opacity-70">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/all-vehicles" className="btn btn-outline">
            All Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
