import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Keyboard,
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import TextField from './TextField';
import Button from './Button';

import { BASE_URL } from '../utils/AppConst';
import post from '../utils/Fetch';

import { w } from '../utils/AppConst';

const UsersOrders = () => {
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState(0);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');

  const getOrders = async () => {
    const orders = await post(`${BASE_URL}/admin/getOrders`, 'GET');
    setOrders(orders);
  };

  useEffect(() => getOrders(), []);

  useEffect(() => {
    setName(order.username);
    setStatus(order.status);
    if (order) {
      const date = new Date(order.date);
      setDate(`${date.getHours()}:${date.getMinutes()}`);
    }
  }, [order]);

  const editOrder = order => setOrder(order);

  const saveChanges = async () => {
    if (name === '' || date === '' || date.indexOf(':') === -1)
      return Alert.alert('Error', 'Please, enter all data!');
    else if (
      status.toLowerCase() !== 'finished' &&
      status.toLowerCase() !== 'return'
    )
      return Alert.alert(
        'Error',
        'Please, enter status of order ("finished" or "return")',
      );

    const newDate = new Date(order.date);
    newDate.setHours(date.split(':')[0]);
    newDate.setMinutes(date.split(':')[1]);

    setOrder(0);
    const updatedOrder = await post(`${BASE_URL}/admin/updateOrder`, 'PUT', {
      id: order._id,
      username: name,
      date: newDate,
      status: status,
      comment: comment,
    });
  };

  return !order ? (
    <ScrollView>
      {orders &&
        orders.map((item, index) => (
          <View style={styles.serviceBlock} key={index}>
            <View style={styles.service}>
              <Text style={styles.text}>{`Name: ${item.username}`}</Text>

              {item.services.map((el, ind) => (
                <View key={ind}>
                  <Text style={styles.textBold}>{el.nameOfService}</Text>
                  <Text style={styles.textBold}>{el.price}</Text>
                </View>
              ))}

              <Text style={styles.text}>{`Status: ${item.status}`}</Text>
            </View>
            <View style={styles.addBtn}>
              <TouchableOpacity onPress={() => editOrder(item)}>
                <Text style={styles.textBtn}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </ScrollView>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <TextField value={name} onTextChange={setName} />
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

const styles = StyleSheet.create({
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

export default UsersOrders;
