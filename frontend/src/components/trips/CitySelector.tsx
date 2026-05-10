import React from 'react';

interface CitySelectorProps {
  value: string;
  onChange: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="city-selector">
      <input
        type="text"
        value={value}
        placeholder="Search city..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CitySelector;
