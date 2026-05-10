import React from "react";
import type { AdminUser } from "../../types/admin";
import UserRow from "./UserRow";
import EmptyState from "./EmptyState";

interface Props {
  users: AdminUser[];
  onDelete: (id: string) => void;
}

const UsersTable = ({ users, onDelete }: Props) => {
  if (users.length === 0) {
    return (
      <EmptyState
        title="No users found"
        description="Try adjusting your search filters"
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F7FB] border-b border-[#E5E7EB]">
            <tr>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">User</th>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Email</th>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Joined Date</th>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
