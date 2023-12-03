import React from 'react';
import './style.scss';
const PostCount = ({ count, setCount }) => {
  const value = [3, 5, 10];
  return (
    <div className="post-count">
      {value.map((item, index) => (
        <div
          className={`post-count__icon ${count === item && 'active'}`}
          onClick={() => setCount(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default PostCount;
