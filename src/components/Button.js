import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Button = ({ text, onBtnPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onBtnPress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 50,
    backgroundColor: '#295FED',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 30,
  },
  btnText: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default Button;
