import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import TextField from '../components/TextField';
import Button from '../components/Button';
import { h } from '../utils/AppConst';

import { BASE_URL } from '../utils/AppConst';
import post from '../utils/Fetch';

const AddCleaner = ({ setBtnNum }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');
  const [newPrice, setNewPrice] = useState(0);

  const [stage, setStage] = useState(0);

  const onTapNext = () => {
    if (name === '' || description == '' || photo === '')
      return Alert.alert('Error!', 'Enter name, description or photo!');

    setStage(1);
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

  const onTapAddCleaner = async () => {
    setBtnNum(0);

    await post(`${BASE_URL}/admin/addCleaner`, 'POST', {
      name: name,
      description: description,
      services: services,
      photo: photo,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.addView}>
          <Text style={styles.text}>Add cleaner</Text>
          {!stage ? (
            <>
              <TextField placeholder="Name" onTextChange={setName} />
              <TextField
                placeholder="Description"
                onTextChange={setDescription}
              />
              <TextField placeholder="Link to image" onTextChange={setPhoto} />
              <Button text={'Next'} onBtnPress={onTapNext} />
            </>
          ) : (
            <>
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

              {services.length !== 0 ? (
                <ScrollView style={styles.services}>
                  {services.map((item, index) => (
                    <View style={styles.serviceBlock} key={index}>
                      <View>
                        <Text style={{ fontSize: 16 }}>
                          Name: {item.nameOfService}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                          Price: {item.price}
                        </Text>
                      </View>

                      <TouchableOpacity onPress={() => deleteService(index)}>
                        <Text style={{ fontSize: 18 }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              ) : null}

              {services.length !== 0 ? (
                <Button text={'Add cleaner'} onBtnPress={onTapAddCleaner} />
              ) : null}
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addView: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    alignSelf: 'center',
    fontSize: 30,
    marginBottom: 30,
  },
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

export default AddCleaner;
