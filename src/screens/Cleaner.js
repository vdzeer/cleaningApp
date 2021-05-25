import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';

import ServicesContainer from '../components/ServicesContainer';

const Cleaner = ({ route, navigation }) => {
  const { user } = useSelector(state => state.userReducer);
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Zakhar cleaner</Text>
      </View>

      <View style={styles.body}>
        <ServicesContainer id={id} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>To all cleaners</Text>
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
    backgroundColor: '#333',
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
    backgroundColor: '#333',
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

export default Cleaner;
