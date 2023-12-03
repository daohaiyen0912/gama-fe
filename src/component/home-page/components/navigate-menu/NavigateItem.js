import React from 'react';
import './style.scss';
export default function NavigateItem({ onClick, description, name, icon }) {
  return (
    <div className="navigate-item" onClick={onClick}>
      {icon}
      <span>{name}</span>
      <span>{description}</span>
    </div>
  );
}
