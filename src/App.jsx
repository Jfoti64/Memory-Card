import { useState, useEffect } from 'react';
import Card from './components/Card';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [cards, setCards] = useState([
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
      text: '01',
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
    },
  ]);

  const [shuffledCards, setShuffledCards] = useState([]);

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  };

  // Shuffle items once on component mount
  useEffect(() => {
    setShuffledCards(shuffleArray(cards));
  }, [cards]);

  function handleCardClick(cardData) {
    setShuffledCards(shuffleArray(cards));
    return (
      <>
        <h1>Memory Card</h1>
        <h2>Don&apos;t click the same card more than once!</h2>
        <div className="card-container">
          {shuffledCards.map((card) => (
            <Card key={card.id} handleClick={handleCardClick} data={card} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Memory Card</h1>
      <h2>Don&apos;t click the same card more than once!</h2>
      <div className="card-container">
        {shuffledCards.map((card) => (
          <Card key={card.id} handleClick={handleCardClick} data={card} />
        ))}
      </div>
    </>
  );
}

export default App;
