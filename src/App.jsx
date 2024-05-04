import { useState, useEffect } from 'react';
import Card from './components/Card';
import { v4 as uuidv4 } from 'uuid';
import Score from './components/Score';

function App() {
  const [cards, setCards] = useState([
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
      text: '01',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: './src/assets/ruby-murphy-5Gz-yFc0mfQ-unsplash.jpg',
      clicked: false,
    },
  ]);

  const [score, setScore] = useState(0);

  useEffect(() => {
    const newScore = cards.filter((card) => card.clicked).length;
    setScore(newScore);
  }, [cards]);

  function resetGame() {
    // Reset clicked property for each card
    setCards(
      cards.map((card) => ({
        ...card,
        clicked: false,
      })) 
    );
  }

  // Shuffle the array
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
    setCards(shuffleArray([...cards]));
  }, []);

  function handleCardClick(cardData) {
    setCards(prevCards => {
      const newCards = prevCards.map(card => {
        if (card.id === cardData.id) {
          if (card.clicked) {
            resetGame();
            return { ...card, clicked: false };
          }
          return { ...card, clicked: true };
        }
        return card;
      });
      return shuffleArray(newCards);
    });
  }

  return (
    <>
      <h1>Memory Card</h1>
      <h2>Don&apos;t click the same card more than once!</h2>
      <Score score={score} />
      <div className="card-container">
        {cards.map((card) => (
          <Card key={card.id} handleClick={() => handleCardClick(card)} data={card} />
        ))}
      </div>
    </>
  );
}

export default App;
