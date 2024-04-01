import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const allCharacters = [
  { 
    id: 1, 
    name: 'Mario', 
    image: require('./assets/mario.png'), 
    alternatives: ['Mario', 'Luigi', 'Yoshi' ],
    correctIndex: 0 
  },
  { 
    id: 2, 
    name: 'Mickey Mouse', 
    image: require('./assets/mickey.png'), 
    alternatives: ['Mickey', 'Donald', 'Goofy' ], 
    correctIndex: 0 
  },
  { 
    id: 3, 
    name: 'SpongeBob SquarePants', 
    image: require('./assets/bobEsponja.png'), 
    alternatives: ['SpongeBob', 'Patrick', 'Squidward' ], 
    correctIndex: 0 
  },
  { 
    id: 4, 
    name: 'Pernalonga', 
    image: require('./assets/pernalonga.png'), 
    alternatives: ['Pernalonga', 'Daffy Duck', 'Porky Pig' ], 
    correctIndex: 0 
  },
  { 
    id: 5, 
    name: 'Pikachu', 
    image: require('./assets/pikachu.png'), 
    alternatives: ['Pikachu', 'Charmander', 'Bulbasaur' ], 
    correctIndex: 0 
  },
  { 
    id: 6, 
    name: 'Popai', 
    image: require('./assets/popai.png'), 
    alternatives: ['Popai', 'Olivia Palito', ' Brutus' ], 
    correctIndex: 0 
  },
  { 
    id: 7, 
    name: 'Pedrita Flintstone', 
    image: require('./assets/pedrita.png'), 
    alternatives: ['Pedrita Flintstone', 'Betty Rubble', 'Wilma Flintstone' ], 
    correctIndex: 0 
  },
  { 
    id: 8, 
    name: 'Mônica', 
    image: require('./assets/monica.png'), 
    alternatives: ['Mônica', 'Magali', 'Carminha Frufru' ], 
    correctIndex: 0 
  },
  { 
    id: 9, 
    name: 'Luluzinha', 
    image: require('./assets/luluzinha.png'), 
    alternatives: ['Luluzinha', 'Annie Inch', 'Miss Feeny' ], 
    correctIndex: 0 
  },
  { 
    id: 10, 
    name: 'Bart Simpsons', 
    image: require('./assets/bart.png'), 
    alternatives: ['Bart Simpsons', 'Homer Simpsons', 'CMontgomery Burns' ], 
    correctIndex: 0 
  },
  { 
    id: 11, 
    name: 'Jane Jetson', 
    image: require('./assets/jane.png'), 
    alternatives: ['Jane Jetson', 'Elroy Jetson', 'Judy Jetson' ], 
    correctIndex: 0 
  },
  { 
    id: 12, 
    name: 'Minnie Mouse', 
    image: require('./assets/minnie.png'), 
    alternatives: ['Minnie', 'Margarida', 'Pluto' ], 
    correctIndex: 0 
  },
  { 
    id: 13, 
    name: 'Scooby-Doo', 
    image: require('./assets/scooby.png'), 
    alternatives: ['Scooby-Doo', 'Salsicha', 'Velma' ], 
    correctIndex: 0 
  },
  { 
    id: 14, 
    name: 'Patolino', 
    image: require('./assets/patolino.png'), 
    alternatives: ['Patolino', 'Pernalonga', 'Lola' ], 
    correctIndex: 0 
  },
  { 
    id: 15, 
    name: 'Mafalda', 
    image: require('./assets/mafalda.png'), 
    alternatives: ['Mafalda', 'Miguelito', 'Susanita' ], 
    correctIndex: 0 
  }
];

function App() {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [gameOverMessage, setGameOverMessage] = useState('');

  useEffect(() => {
    generateRandomCharacters();
  }, [currentRound]);

  const generateRandomCharacters = () => {
    const shuffledCharacters = allCharacters.sort(() => 0.5 - Math.random());
    const selectedCharacters = shuffledCharacters.slice(0, 5);
    setCurrentCharacters(selectedCharacters);
  };

  const handleAnswerSelection = (index) => {
    setSelectedAnswer(index);
  };

  const handleGuess = () => {
    const correctIndex = currentCharacters[currentRound].correctIndex;
    if (selectedAnswer === correctIndex) {
      setScore(score + 1);
    }
    setCurrentRound(currentRound + 1);
    setSelectedAnswer(null);
  };

  const resetGame = () => {
    setCurrentRound(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameOverMessage('');
  };

  useEffect(() => {
    if (currentRound === currentCharacters.length) {
      if (score >= 3) {
        setGameOverMessage(`Parabéns! Sua pontuação foi ${score}.`);
      } else {
        setGameOverMessage('Não foi dessa vez, tente novamente!');
      }
    }
  }, [currentRound, currentCharacters, score]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Guess the Character</Text>
      {currentRound < currentCharacters.length ? (
        <View style={{ alignItems: 'center' }}>
          <Image 
            source={currentCharacters[currentRound].image}
            style={{ width: 280, height: 200, marginBottom: 20, borderRadius: 10 }}
          />
          <View style={{ marginBottom: 20 }}>
            {currentCharacters[currentRound].alternatives.map((alternative, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleAnswerSelection(index)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{alternative}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={handleGuess}>
              <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text>Game Over</Text>
          <Text>Your final score: {score}</Text>
          <Text>{gameOverMessage}</Text>
          <TouchableOpacity onPress={resetGame}>
            <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}>
              <Text style={{ color: 'white' }}>Play Again</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Text>Score: {score}</Text>
    </View>
  );
}

export default App;
