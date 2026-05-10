import React from 'react';

interface NotesCardProps {
  title: string;
  content: string;
  updatedAt: string;
}

const NotesCard: React.FC<NotesCardProps> = ({ title, content, updatedAt }) => {
  return (
    <div className="notes-card">
      <h4>{title}</h4>
      <p>{content}</p>
      <small>Updated: {updatedAt}</small>
    </div>
  );
};

export default NotesCard;
