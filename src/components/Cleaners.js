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

import { BASE_URL } from '../utils/AppConst';
import post from '../utils/Fetch';

const Cleaners = () => {
  const [cleanerID, setCleanerID] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [photo, setPhoto] = useState('');
  const [newService, setNewService] = useState('');
  const [newPrice, setNewPrice] = useState(0);

  const [stage, setStage] = useState(0);

  const getCleaner = async () => {
    const cleaner = await post(`${BASE_URL}/users/getOneCleaner`, 'POST', {
      id: cleanerID,
    });
    setName(cleaner.name);
    setDescription(cleaner.description);
    setServices(cleaner.services);
    setPhoto(cleaner.photo);
  };

  useEffect(() => getCleaner(), [cleanerID]);

  const onCleanerPress = id => {
    setCleanerID(id);
  };

  const onTapNext = () => {
    if (name === '' || description == '' || photo === '')
      return Alert.alert('Error!', 'Enter name, descriprion or photo!');

    setStage(1);
  };

  const onTapDelete = async () => {
    const id = cleanerID;
    setCleanerID(0);

    const deletedCleaner = await post(
      `${BASE_URL}/admin/deleteCleaner`,
      'POST',
      {
        id: id,
      },
    );
  };

  const onTapAddService = () => {
    if (newService !== '' && +newPrice > 0) {
      setServices(prevServices => [
        ...prevServices,
        { nameOfService: newService, price: newPrice },
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

  const saveChanges = async () => {
    if (
      name === '' ||
      description === '' ||
      services.length === 0 ||
      photo === ''
    )
      return Alert.alert('Error', 'Please, enter all data!');

    const id = cleanerID;
    setCleanerID(0);

    const updatedCleaner = await post(
      `${BASE_URL}/admin/updateCleaner`,
      'PUT',
      {
        id: id,
        name: name,
        description: description,
        services: services,
        photo: photo,
      },
    );
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
            <TextField value={photo} onTextChange={setPhoto} />
            <Button text={'To services'} onBtnPress={onTapNext} />
            <Button text={'Delete'} onBtnPress={onTapDelete} />
          </>
        ) : (
          <>
            {services && services.length !== 0 ? (
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
