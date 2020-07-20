import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './components/Header';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);

  const restartNewGame = () => {
    setGuessRound(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNUmber) => {
    setUserNumber(selectedNUmber);
    setGuessRound(0);
  };

  const gameOverHandler = (numberOfHandler) => {
    setGuessRound(numberOfHandler);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRound > 0) {
    content = (
      <GameOver
        selectedUserNumber={userNumber}
        roundsNumber={guessRound}
        onRestart={restartNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
