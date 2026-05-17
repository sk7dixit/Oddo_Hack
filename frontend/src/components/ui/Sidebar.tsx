import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="h-[calc(100vh-64px)] w-64 border-r border-white/10 bg-zinc-950/30 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Navigation</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/trips" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-all hover:bg-white/5 hover:text-white">
                Trips
              </Link>
            </li>
            <li>
              <Link to="/budget" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-all hover:bg-white/5 hover:text-white">
                Budget
              </Link>
            </li>
            <li>
              <Link to="/checklist" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-all hover:bg-white/5 hover:text-white">
                Checklist
              </Link>
            </li>
            <li>
              <Link to="/notes" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-all hover:bg-white/5 hover:text-white">
                Notes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
