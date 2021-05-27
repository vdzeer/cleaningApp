import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { w } from '../utils/AppConst';
import { BASE_URL } from '../utils/AppConst';
import post from '../utils/Fetch';

const ServicesContainer = ({ id, btnText, editServices }) => {
  const [services, setServices] = useState(null);

  const getServices = async () => {
    const cleaner = await post(`${BASE_URL}/users/getOneCleaner`, 'POST', {
      id: id,
    });
    setServices(cleaner.services);
  };

  useEffect(() => {
    getServices();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.serviceBlock}>
        <View style={styles.service}>
          <Text style={styles.textBold}>{item.nameOfService}</Text>
          <Text style={styles.text}>{`Price: ${item.price}`}</Text>
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
      keyExtractor={item => Math.random() * 100000} // dont have any keys
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
