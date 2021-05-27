import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  Keyboard,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import { h } from '../utils/AppConst';

import TextField from './TextField';
import Button from './Button';
import CleanersContainer from './CleanersContainer';

const Cleaners = () => {
  const [cleanerID, setCleanerID] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [gallery, setGallery] = useState('');
  const [newService, setNewService] = useState('');
  const [newPrice, setNewPrice] = useState(0);

  const [stage, setStage] = useState(0);

  useEffect(() => {
    setName('Zakhar cleaning');
    setDescription('This is Zakhar!');
    setServices([
      { _id: 0, nameOfService: 'ggwp asdads as asd ad asd ', price: 30 },
      { _id: 1, nameOfService: 'ggwp', price: 30 },
      { _id: 2, nameOfService: 'ggwp', price: 30 },
      { _id: 3, nameOfService: 'ggwp', price: 30 },
      { _id: 4, nameOfService: 'ggwp', price: 30 },
    ]);
    setGallery('https://source.unsplash.com/1024x768/?nature');
  }, [cleanerID]);

  const onCleanerPress = id => {
    setCleanerID(id);
  };

  const onTapNext = () => {
    if (name === '' || description == '' || gallery === '')
      return Alert.alert('Error!', 'Enter name, descriprion or gallery!');

    setStage(1);
  };

  const onTapDelete = () => {
    // запрос в бд
    setCleanerID(0);
  };

  const onTapAddService = () => {
    if (newService !== '' && +newPrice > 0) {
      setServices(prevServices => [
        ...prevServices,
        { service: newService, price: newPrice },
      ]);
      setNewService('');
      setNewPrice(0);
    } else {
      Alert.alert('Error!', 'Please, enter correct data!');
    }
  };

  const deleteService = id => {
    setServices(prevServices =>
      prevServices.filter((item, index) => index != id),
    );
  };

  const saveChanges = () => {
    if (
      name === '' ||
      description === '' ||
      services.length === 0 ||
      gallery === ''
    )
      return Alert.alert('Error', 'Please, enter all data!');

    // запрос в бд
    setCleanerID(0);
  };

  return !cleanerID ? (
    <CleanersContainer onCleanerPress={onCleanerPress} />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        {!stage ? (
          <>
            <TextField value={name} onTextChange={setName} />
            <TextField value={description} onTextChange={setDescription} />
            <TextField value={gallery} onTextChange={setGallery} />
            <Button text={'To services'} onBtnPress={onTapNext} />
            <Button text={'Delete'} onBtnPress={onTapDelete} />
          </>
        ) : (
          <>
            {services.length !== 0 ? (
              <ScrollView style={styles.services}>
                {services.map((item, index) => (
                  <View style={styles.serviceBlock} key={index}>
                    <View>
                      <Text style={{ fontSize: 16 }}>
                        Name: {item.nameOfService}
                      </Text>
                      <Text style={{ fontSize: 16 }}>Price: {item.price}</Text>
                    </View>

                    <TouchableOpacity onPress={() => deleteService(index)}>
                      <Text style={{ fontSize: 18 }}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            ) : null}

            <View>
              <TextField
                value={newService}
                placeholder="Name of service"
                onTextChange={setNewService}
              />
              <TextField
                value={!newPrice ? '' : newPrice}
                placeholder={'Price of service'}
                onTextChange={setNewPrice}
              />
              <Button text={'Add service'} onBtnPress={onTapAddService} />
            </View>
            <Button text={'Save'} onBtnPress={saveChanges} />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  serviceBlock: {
    borderBottomWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  services: {
    height: h * 0.25,
  },
});

export default Cleaners;
