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

import { useSelector, useDispatch } from 'react-redux';
import { onLogin } from '../redux';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { token } = useSelector(state => state.userReducer);

  useEffect(() => {
    if (token !== '') navigation.navigate('Home');
  }, [token]);

  const onTapLogin = () => {
    if (email === '' || password == '')
      Alert.alert('Error!', 'Enter email or password!');
    else if (!validateEmail(email))
      Alert.alert('Error!', 'Enter correct email!');
    else {
      dispatch(onLogin(email, password));
      setEmail('');
      setPassword('');
    }
  };

  const onTapRegister = () => {
    navigation.navigate('Register');
  };

  const onTapReset = () => {
    navigation.navigate('Reset');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.loginView}>
          <Text style={styles.text}>Login</Text>
          <TextField
            value={email}
            placeholder="Email"
            onTextChange={setEmail}
          />
          <TextField
            value={password}
            placeholder="Password"
            onTextChange={setPassword}
            isSecure={true}
          />
          <Button text={'Sign In'} onBtnPress={onTapLogin} />
          <Button text={'Sing Up'} onBtnPress={onTapRegister} />
          <Button text={'Reset password'} onBtnPress={onTapReset} />
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
