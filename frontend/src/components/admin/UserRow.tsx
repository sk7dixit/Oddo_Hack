import React from "react";
import { Trash2, Shield, User } from "lucide-react";
import type { AdminUser } from "../../types/admin";

interface Props {
  user: AdminUser;
  onDelete: (id: string) => void;
}

const UserRow = ({ user, onDelete }: Props) => {
  return (
    <tr className="hover:bg-[#F5F7FB] transition-colors group">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-white transition-colors">
            <User size={20} />
          </div>
          <span className="font-semibold text-[#111827] text-sm">{user.name}</span>
        </div>
      </td>
      <td className="p-4 text-[#6B7280] text-sm">{user.email}</td>
      <td className="p-4 text-[#6B7280] text-sm">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button 
            title="Edit Permissions"
            className="p-2 text-zinc-400 hover:text-[#8B5CF6] hover:bg-violet-50 rounded-lg transition-all"
          >
            <Shield size={18} />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            title="Delete User"
            className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
