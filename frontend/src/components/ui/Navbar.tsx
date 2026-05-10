import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/">Traveloop</Link>
      <Link to="/trips">My Trips</Link>
      <Link to="/budget">Budget</Link>
      <Link to="/checklist">Checklist</Link>
      <Link to="/notes">Notes</Link>
    </nav>
  );
};

export default Navbar;
