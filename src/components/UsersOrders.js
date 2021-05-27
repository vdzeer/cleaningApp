import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  Keyboard,
  View,
} from 'react-native';

import ServicesContainer from '../components/ServicesContainer';
import TextField from './TextField';
import Button from './Button';

const UsersOrders = () => {
  const usersOrders = [
    {
      _id: 0,
      name: 'Zakhar',
      nameOfService: 'ggwp asdads as asd ad asd ',
      price: 30,
      status: 'Waiting',
      date: '',
    },
    {
      _id: 1,
      name: 'Vadim',
      nameOfService: 'ggwp',
      price: 30,
      status: 'Waiting',
      date: '',
    },
    {
      _id: 2,
      name: 'Maks',
      nameOfService: 'ggwp',
      price: 30,
      status: 'Finished',
      date: '',
    },
  ];

  const [order, setOrder] = useState(0);
  const [name, setName] = useState('');
  const [nameOfService, setNameOfService] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    setName(order.name);
    setNameOfService(order.nameOfService);
    setPrice(`${order.price}`);
    setStatus(order.status);
    setDate(order.date);
  }, [order]);

  const editOrder = service => setOrder(service);
  const saveChanges = () => {
    if (name === '' || nameOfService === '' || price === '' || date === '')
      return Alert.alert('Error', 'Please, enter all data!');
    else if (
      status.toLowerCase() !== 'finished' &&
      status.toLowerCase() !== 'return'
    )
      return Alert.alert(
        'Error',
        'Please, enter status of order ("finished" or "return")',
      );

    // запрос в бд
    setOrder(0);
  };

  return !order ? (
    <ServicesContainer
      editServices={editOrder}
      userServices={usersOrders}
      btnText={'Edit'}
    />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <TextField value={name} onTextChange={setName} />
        <TextField value={nameOfService} onTextChange={setNameOfService} />
        <TextField value={price} onTextChange={setPrice} />
        <TextField value={date} onTextChange={setDate} />
        <TextField value={status} onTextChange={setStatus} />
        {status && status.toLowerCase() === 'return' ? (
          <TextField placeholder={'Enter comment'} onTextChange={setComment} />
        ) : null}

        <Button text={'Save'} onBtnPress={saveChanges} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UsersOrders;
