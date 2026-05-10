import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-9xl font-black text-blue-100 mb-0">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 -mt-8 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-10 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFound;
