import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import CustomButton from '../components/CustomButton';

const GameOver = (props) => {
  return (
    // eslint-disable-next-line no-undef
    <View style={styles.screen}>
      <Text>The Game is Over</Text>
      <Image
        // source={require('../assets/success.png')}
        source={{
          uri: 'https://images.app.goo.gl/VdcWYgr7RzJYDgD19',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text>Number of Rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.selectedUserNumber}</Text>
      <CustomButton onPress={props.onRestart}>Restart Game</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});

export default GameOver;
