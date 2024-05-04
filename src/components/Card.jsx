import React, { useState } from 'react';

function Card({ handleClick, data }) {
  return (
    <button className="card" onClick={() => handleClick(data)}>
      <img src={data.imgSrc} alt="" />
      {data.text}
    </button>
  );
}

export default Card;
