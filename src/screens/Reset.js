import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import TextField from '../components/TextField';
import Button from '../components/Button';
import { validateEmail } from '../utils/Validators';

import { BASE_URL } from '../utils/AppConst';
import post from '../utils/Fetch';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');

  const [stage, setStage] = useState(0);

  const onTapNext = async () => {
    if (!validateEmail(email))
      return Alert.alert('Error!', 'Enter correct email!');

    const code = await post(`${BASE_URL}/auth/reset`, 'POST', {
      email: email,
    });
    console.log(code);
    setCode(code);
    setStage(1);
  };

  const onTapFinish = async () => {
    if (code != userCode) return Alert.alert('Error!', 'Incorrect code!');
    else if (password.length < 6 || password.length > 25)
      return Alert.alert('Error!', 'Password must be > 5 and < 26 characters!');

    const updatedUser = await post(`${BASE_URL}/auth/updateUser`, 'POST', {
      email: email,
      password: password,
    });

    Alert.alert('Successful!', 'You changed password!');
    navigation.navigate('Login');
  };

  const onTapLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.loginView}>
          <Text style={styles.text}>Reset</Text>
          <TextField
            value={email}
            placeholder="Email"
            onTextChange={setEmail}
          />
          {!stage ? (
            <Button text={'Next'} onBtnPress={onTapNext} />
          ) : (
            <>
              <TextField
                value={userCode}
                placeholder="Code from email"
                onTextChange={setUserCode}
              />
              <TextField
                value={password}
                placeholder="New password"
                onTextChange={setPassword}
              />
              <Button text={'Next'} onBtnPress={onTapFinish} />
            </>
          )}

          <Button text={'Back'} onBtnPress={onTapLogin} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginView: {
    marginTop: 200,
    marginLeft: 20,
    marginRight: 20,
    height: 400,
  },
  text: {
    alignSelf: 'center',
    fontSize: 30,
    marginBottom: 30,
  },
});

export default Login;
