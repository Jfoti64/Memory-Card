function Card({ handleClick, data }) {
  return (
    <button className="card" onClick={() => handleClick(data)}>
      <img src={data.imgSrc} alt="" />
      <p>{data.text}</p>
    </button>
  );
}

export default Card;
