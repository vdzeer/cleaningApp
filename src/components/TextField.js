import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const TextField = ({
  placeholder,
  isSecure = false,
  editable = true,
  onTextChange,
  value = '',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        defaultValue={value}
        secureTextEntry={isSecure}
        onChangeText={text => onTextChange(text)}
        style={styles.textField}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#CBCDCD',
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 30,
  },
  textField: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: '#000',
  },
});

export default TextField;
