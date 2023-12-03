import React from 'react';
import { useState } from 'react';
import { CirclePicker } from 'react-color';
import './style.scss';
const ColorPicker = (color, onChange) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`color-picker ${color}`}
      style={{ backgroundColor: color }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div className="color-picker-picker">
          <CirclePicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
