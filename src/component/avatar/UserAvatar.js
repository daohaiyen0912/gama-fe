import React from 'react';
import './style.scss'
export const UserAvatar = ({ src, className }) => {
  const bgColor = () => {
    return Math.floor((src / 111) * 16777215).toString(16);
  };
  return (
    <img
      style={{
        backgroundColor: `#${bgColor().padStart(6, '0')}`,
      }}
      className={`user-avatar ${className}`}
      src={src ? `https://robohash.org/${src}` : '../../image/default_user.png'}
      alt="avatar"
    />
  );
};
