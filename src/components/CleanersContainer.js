import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Cleaner from '../components/Cleaner';

const CleanersContainer = ({ navigation }) => {
  const cleaners = [
    {
      _id: '1231sqadasd213',
      name: 'Zakhar cleaning',
      description: 'This is Zakhar!',
      services: [],
      gallery: 'https://source.unsplash.com/1024x768/?nature',
    },
    {
      _id: '324432431sqadasd213',
      name: 'Vadim cleaning',
      description: 'This is Zakhar!',
      services: [],
      gallery: 'https://source.unsplash.com/1024x768/?nature',
    },
    {
      _id: 'asdads341231sqadasd213',
      name: 'Maks cleaning',
      description: 'This is Zakhar!',
      services: [],
      gallery: 'https://source.unsplash.com/1024x768/?nature',
    },
    {
      _id: '1asdas31sqadasd213',
      name: 'Petro cleaning',
      description: 'This is Zakhar!',
      services: [],
      gallery: 'https://source.unsplash.com/1024x768/?nature',
    },
    {
      _id: '1@@@@231sqadasd213',
      name: 'Danil cleaning',
      description: 'This is Zakhar!',
      services: [],
      gallery: 'https://source.unsplash.com/1024x768/?nature',
    },
  ];

  const onCleanerPress = id => {
    navigation.navigate('Cleaner', { id: id });
  };

  const renderItem = ({ item }) => {
    return (
      <Cleaner
        name={item.name}
        gallery={item.gallery}
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
