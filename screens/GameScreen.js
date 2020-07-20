/* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Button, Alert, ScrollView, FlatList, Dimensions} from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (numOfRound ,value) => {
  return(
    <View key={value} style={styles.listItem}>
     <Text>#{numOfRound - value.index}</Text>
      <Text>{value.item}</Text>
    </View>
  );
};

const GameScreen = (props) => {

  const number = generateRandomNumber(1,100,props.userChoice);
  const [pastGuesses, setPastGuesses] = useState([number.toString()]);
  const [currentGuess, setCurrentGuess] = useState(number);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const {userChoice, onGameOver} = props;
  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'higher' && currentGuess > userChoice)
    ) {
      Alert.alert("Dont't Lie!!", 'this is wrong...!', [
        {text: 'Ok', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber.toString(),...curPastGuesses]);
  };

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change',updateLayout);
    return () => {
      Dimensions.removeEventListener('change',updateLayout);
    }
  });

  useEffect(() => {
    if (currentGuess === userChoice){
        onGameOver(pastGuesses.length);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGuess, userChoice, onGameOver]);

  if (deviceHeight < 500) {
    return(
      <View style={styles.screen}>
        <View style={styles.controls}>
          <CustomButton onPress={nextGuessHandler.bind(this,'lower')}>Lower</CustomButton>
          <Text>Chosen Number: {currentGuess}</Text>
          <CustomButton onPress={nextGuessHandler.bind(this,'higher')}>Higher</CustomButton>
        </View>
      <View style={styles.listContainer}>
        <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this,pastGuesses.length)} contentContainerStyle={styles.list} />
      </View>
    </View>
    );
  } else {
    return (
      <View style={styles.screen}>
      <Text>Chosen Number: {currentGuess}</Text>
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={nextGuessHandler.bind(this,'lower')}>Lower</CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this,'higher')}>Higher</CustomButton>
      </Card>
      <View style={styles.listContainer}>
        <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this,pastGuesses.length)} contentContainerStyle={styles.list} />
      </View>
    </View>
    );
  }

  
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  controls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
      alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 400,
    maxWidth: '100%',
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%': '80%',
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default GameScreen;
