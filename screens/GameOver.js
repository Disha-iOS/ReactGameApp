import React from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';
import CustomButton from '../components/CustomButton';

const GameOver = (props) => {
  return (
    // eslint-disable-next-line no-undef
    <ScrollView>
    <View style={styles.screen}>
      <Text>The Game is Over</Text>
      <Image
        source={require('../assets/success.png')}
        // source={{
          // uri: 'https://images.app.goo.gl/VdcWYgr7RzJYDgD19',
        // }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text>Number of Rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.selectedUserNumber}</Text>
      <CustomButton onPress={props.onRestart}>Restart Game</CustomButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    maxWidth: 300,
    maxHeight: 300,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
});

export default GameOver;
