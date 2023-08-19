import React from 'react';

function CircleWithText({ text }) {
  return (
    <div className="relative w-[29px] h-[29px] m-auto mb-1 bg-red-700 rounded-md">
    <span className="absolute -top-[3px] left-0 right-0 mx-auto text-white font-bold text-white">{text}</span>
  </div>
  );
}

export default CircleWithText;