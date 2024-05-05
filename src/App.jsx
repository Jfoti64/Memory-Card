import { useState, useEffect } from 'react';
import Card from './components/Card';
import { v4 as uuidv4 } from 'uuid';
import Score from './components/Score';
import HighScore from './components/HighScore';

function App() {
  const [cards, setCards] = useState([
    {
      id: uuidv4(),
      imgSrc: '',
      text: '',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: '',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: '',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: '',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: '',
      clicked: false,
    },
    {
      id: uuidv4(),
      imgSrc: '',
      clicked: false,
    },
  ]);

  const [highScore, setHighScore] = useState(0);

  const [score, setScore] = useState(0);

  useEffect(() => {
    const newScore = cards.filter((card) => card.clicked).length;
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  }, [cards]);

  // Shuffle the array
  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  };

  useEffect(() => {
    const usedIds = [];
    const fetchImages = async () => {
      const updatedCards = await Promise.all(
        cards.map(async (card) => {
          try {
            let randomPokemonId;
            do {
              randomPokemonId = Math.floor(Math.random() * 151) + 1;
            } while (usedIds.includes(randomPokemonId));

            usedIds.push(randomPokemonId);

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
            const json = await response.json();
            const src = json.sprites.front_default;
            const pokemonName = json.name;
            return { ...card, imgSrc: src, text: pokemonName };
          } catch (error) {
            console.error('Error fetching data for card:', card.id, error);
            return card; // Return card unchanged in case of error
          }
        })
      );

      setCards(shuffleArray(updatedCards)); // Shuffle after all fetches complete
    };

    fetchImages();
  }, []);

  function handleCardClick(cardData) {
    setCards((prevCards) => {
      let reset = false;
      const newCards = prevCards.map((card) => {
        if (card.id === cardData.id) {
          if (card.clicked) {
            reset = true;
            return { ...card, clicked: false };
          }
          return { ...card, clicked: true };
        }
        return card;
      });

      return reset
        ? shuffleArray(newCards.map((card) => ({ ...card, clicked: false })))
        : shuffleArray(newCards);
    });
  }

  return (
    <>
      <h1>Memory Card</h1>
      <h2>Don&apos;t click the same card more than once!</h2>
      <HighScore highScore={highScore} />
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
