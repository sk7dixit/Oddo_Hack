import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAdminProfile, updateAdminProfile } from "../../services/adminService";

const ProfileSettingsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profile = await getAdminProfile();
      setName(profile.name || "");
      setEmail(profile.email || "");
    } catch (err) {
      toast.error("Failed to load profile details");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateAdminProfile({ name, email });
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <div className="space-y-1.5">
        <label className="block text-[13px] font-bold text-[#111827]">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full 
            bg-white 
            border 
            border-[#E5E7EB] 
            rounded-xl 
            px-4 
            py-2.5 
            text-sm 
            text-[#111827] 
            focus:outline-none 
            focus:ring-4 
            focus:ring-violet-100 
            focus:border-[#8B5CF6] 
            shadow-sm 
            transition-all
          "
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-[13px] font-bold text-[#111827]">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full 
            bg-white 
            border 
            border-[#E5E7EB] 
            rounded-xl 
            px-4 
            py-2.5 
            text-sm 
            text-[#111827] 
            focus:outline-none 
            focus:ring-4 
            focus:ring-violet-100 
            focus:border-[#8B5CF6] 
            shadow-sm 
            transition-all
          "
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          px-6 
          py-2.5 
          bg-[#8B5CF6] 
          hover:bg-[#7C3AED] 
          text-white 
          rounded-xl 
          font-bold 
          text-sm
          transition-all 
          disabled:opacity-50 
          mt-4 
          shadow-[0_4px_20px_rgba(139,92,246,0.2)]
          active:scale-95
        "
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileSettingsForm;
