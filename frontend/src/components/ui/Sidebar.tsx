import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/trips">Trips</Link></li>
        <li><Link to="/budget">Budget</Link></li>
        <li><Link to="/checklist">Checklist</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
