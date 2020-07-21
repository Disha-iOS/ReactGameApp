import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Colors from '../constants/colors';
const Header = (props) => {
  return (
    <View style={{...styles.headerBase,...Platform.select({ios: styles.headerIos, android: styles.headerAndroid})}}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 88,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIos: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerAndroid: {
    backgroundColor: Colors.accent ,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
  },
});
export default Header;
