import React from 'react';

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ label, checked, onToggle }) => {
  return (
    <div className="checklist-item" onClick={onToggle}>
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span style={{ textDecoration: checked ? 'line-through' : 'none' }}>{label}</span>
    </div>
  );
};

export default ChecklistItem;
