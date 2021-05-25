import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { w } from '../utils/AppConst';

const ServicesContainer = ({ id }) => {
  const services = [
    { _id: 0, name: 'ggwp', price: 30 },
    { _id: 1, name: 'ggwp', price: 30 },
    { _id: 2, name: 'ggwp', price: 30 },
    { _id: 3, name: 'ggwp', price: 30 },
    { _id: 4, name: 'ggwp', price: 30 },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.serviceBlock}>
        <View style={styles.service}>
          <Text style={styles.text}>Name of service: {item.name}</Text>
          <Text style={styles.text}>Price: {item.price}$</Text>
          <TouchableOpacity>
            <Text style={styles.text}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={services}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 30,
    marginBottom: 30,
  },
  serviceBlock: {
    width: w * 0.95,
    alignSelf: 'center',
    marginBottom: 5,
  },
  service: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 18,
  },
});

export default ServicesContainer;
