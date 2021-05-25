import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Cleaner from './src/screens/Cleaner';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={Login}>
          {/* <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} /> */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Cleaner" component={Cleaner} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
