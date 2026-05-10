import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, KeyRound } from "lucide-react";

const SecuritySettings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.info("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280]">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="text-[#111827] font-bold text-sm">Change Password</h3>
            <p className="text-xs text-[#6B7280]">Update your admin login password</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-[#F5F7FB] hover:bg-[#E5E7EB] text-[#111827] rounded-xl font-bold text-[13px] transition-all active:scale-95">
          Update
        </button>
      </div>

      <div className="flex items-center justify-between py-2 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
            <LogOut size={20} />
          </div>
          <div>
            <h3 className="text-rose-600 font-bold text-sm">Sign Out</h3>
            <p className="text-xs text-[#6B7280]">Log out of the admin session</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-[13px] transition-all shadow-[0_4px_20px_rgba(244,63,94,0.2)] active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
