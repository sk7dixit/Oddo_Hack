import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950/50 px-8 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          Trave<span className="text-blue-500">Loop</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/trips" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">My Trips</Link>
          <Link to="/budget" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Budget</Link>
          <Link to="/checklist" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Checklist</Link>
          <Link to="/notes" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Notes</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Profile/User Menu could go here */}
      </div>
    </nav>
  );
};

export default Navbar;
