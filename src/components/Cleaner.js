import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from '../components/Button';
import { w, h } from '../utils/AppConst';

const Home = ({ name, gallery, onCleanerPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onCleanerPress}>
      <View>
        <Text style={styles.text}>{name}</Text>
        <Image
          style={styles.img}
          source={{
            uri: gallery,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: w * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 20,
    borderStyle: 'dashed',
    padding: 20,
  },
  text: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 7,
  },
  img: {
    width: w * 0.8,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
});

export default Home;
