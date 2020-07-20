import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = (props) => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
  input: {
    fontSize: 12,
    width: 50,
    padding: 5,
    margin: 10,
    height: 30,
    borderWidth: 0.5,
    borderBottomColor: 'black',
  },
});

export default Input;
