import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { w } from '../utils/AppConst';

const ServicesContainer = ({
  id = null,
  userServices = null,
  btnText,
  editServices,
}) => {
  const services = userServices
    ? userServices
    : [
        { _id: 0, name: 'ggwp asdads as asd ad asd ', price: 30 },
        { _id: 1, name: 'ggwp', price: 30 },
        { _id: 2, name: 'ggwp', price: 30 },
        { _id: 3, name: 'ggwp', price: 30 },
        { _id: 4, name: 'ggwp', price: 30 },
      ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.serviceBlock}>
        <View style={styles.service}>
          <Text style={styles.textBold}>
            {userServices ? `${item.nameOfCleaner}: ${item.name}` : item.name}
          </Text>
          <Text style={styles.text}>
            {userServices
              ? `Price: ${item.price}, status: ${item.status}`
              : `Price: ${item.price}`}
          </Text>
        </View>
        <View style={styles.addBtn}>
          <TouchableOpacity onPress={() => editServices(item)}>
            <Text style={styles.textBtn}>{btnText}</Text>
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
    marginBottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  service: {},
  text: {
    fontSize: 18,
    alignSelf: 'center',
  },
  textBold: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '700',
  },
  addBtn: {
    height: 35,
    backgroundColor: '#295FED',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
  },
  textBtn: { fontSize: 16, color: '#FFF' },
});

export default ServicesContainer;
