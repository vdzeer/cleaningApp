import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';

import CleanersContainer from '../components/CleanersContainer';

const Home = ({ navigation }) => {
  const { user } = useSelector(state => state.userReducer);

  const onCleanerPress = id => {
    navigation.navigate('Cleaner', { id: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dry cleaners</Text>
      </View>

      <View style={styles.body}>
        <CleanersContainer onCleanerPress={onCleanerPress} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => navigation.navigate('MyOrders')}>
          <Text style={styles.footerText}>My Orders</Text>
        </TouchableOpacity>

        {user.role !== 'ADMIN' && (
          <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => navigation.navigate('Admin')}>
            <Text style={styles.footerText}>Admin Panel</Text>
          </TouchableOpacity>
        )}
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
  body: { flex: 9 },
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
