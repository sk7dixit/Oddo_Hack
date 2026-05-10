import AdminLoginForm from "../../components/admin/AdminLoginForm";
import React from "react";

const AdminLoginPage = () => {
  return (
    <div
      className="
        min-h-screen
        bg-black
        flex
        items-center
        justify-center
        px-4
      "
    >
      <AdminLoginForm />
    </div>
  );
};

export default AdminLoginPage;
