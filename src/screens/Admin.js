import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Button from '../components/Button';
import AddCleaner from '../components/AddCleaner';

const Home = ({ navigation }) => {
  const [btnNum, setBtnNum] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Panel</Text>
      </View>

      <View style={styles.body}>
        {!btnNum ? (
          <>
            <Button text={'Users orders'} onBtnPress={() => setBtnNum(1)} />
            <Button text={'Edit cleaners'} onBtnPress={() => setBtnNum(2)} />
            <Button text={'Add cleaner'} onBtnPress={() => setBtnNum(3)} />
          </>
        ) : null}
        {btnNum === 1 ? null : null}
        {btnNum === 2 ? null : null}
        {btnNum === 3 ? <AddCleaner setBtnNum={setBtnNum} /> : null}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => (btnNum ? setBtnNum(0) : navigation.goBack())}>
          <Text style={styles.footerText}>
            {btnNum ? 'Back' : 'To home page'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#295FED',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    alignSelf: 'center',
    letterSpacing: 1,
    color: '#FFF',
  },
  body: { flex: 9, justifyContent: 'center' },
  footer: {
    flex: 1,
    backgroundColor: '#295FED',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 20,
    fontWeight: '400',
    alignSelf: 'center',
    letterSpacing: 1,
    color: '#FFF',
  },
});

export default Home;
