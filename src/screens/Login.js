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

import { useSelector, useDispatch } from 'react-redux';
import { onLogin } from '../redux';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { user, error } = useSelector(state => state.userReducer);

  useEffect(() => {
    const token = user?.token;
    if (!user) Alert.alert('Error!', "User doesn't exist or wrong password");
    else if (token !== undefined) {
      navigation.navigate('Home');
    }
  }, [user]);

  const onTapLogin = () => {
    if (error) Alert.alert('Error!', error);
    else if (email === '' || password == '')
      Alert.alert('Error!', 'Enter email or password!');
    else dispatch(onLogin(email, password));
  };

  const onTapRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.loginView}>
          <Text style={styles.text}>Login</Text>
          <TextField placeholder="Email" onTextChange={setEmail} />
          <TextField
            placeholder="Password"
            onTextChange={setPassword}
            isSecure={true}
          />
          <Button text={'Sign In'} onBtnPress={onTapLogin} />
          <Button text={'Sing Up'} onBtnPress={onTapRegister} />
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
