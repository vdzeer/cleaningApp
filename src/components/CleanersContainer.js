import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Cleaner from '../components/Cleaner';
import { BASE_URL } from '../utils/AppConst';
import post from '../utils/Fetch';

const CleanersContainer = ({ onCleanerPress }) => {
  const [cleaners, setCleaners] = useState([]);

  const getCleaners = async () => {
    const cleaners = await post(`${BASE_URL}/users/getCleaners`, 'GET');
    setCleaners(cleaners);
  };

  useEffect(() => getCleaners(), []);

  const renderItem = ({ item }) => {
    return (
      <Cleaner
        name={item.name}
        photo={item.photo}
        onCleanerPress={() => onCleanerPress(item._id)}
      />
    );
  };

  return (
    <FlatList
      data={cleaners}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 30,
  },
});

export default CleanersContainer;
