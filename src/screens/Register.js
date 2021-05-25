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
import { onRegister } from '../redux';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const dispatch = useDispatch();
  const { user, error } = useSelector(state => state.userReducer);

  useEffect(() => {
    const token = user?.token;
    if (token !== undefined) navigation.navigate('Home');
  }, [user]);

  const onTapRegister = () => {
    if (error) Alert.alert('Error!', error);
    else if (email === '' || password == '')
      Alert.alert('Error!', 'Enter email or password!');
    else if (!validateEmail(email))
      Alert.alert('Error!', 'Enter correct email!');
    else if (password.length < 6 || password.length > 16)
      Alert.alert('Error!', 'Password must be > 5 and < 16 characters!');
    else if (password !== rePassword)
      Alert.alert('Error!', 'Password mismatch!');
    else dispatch(onRegister(email, password));
  };

  const onTapLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.loginView}>
          <Text style={styles.text}>Registration</Text>
          <TextField placeholder="Email" onTextChange={setEmail} />
          <TextField
            placeholder="Password"
            onTextChange={setPassword}
            isSecure={true}
          />
          <TextField
            placeholder="Repeat password"
            onTextChange={setRePassword}
            isSecure={true}
          />
          <Button text={'Sign Up'} onBtnPress={onTapRegister} />
          <Button text={'Sign In'} onBtnPress={onTapLogin} />
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
    marginTop: 150,
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

export default Register;
