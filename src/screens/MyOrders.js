import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { onChangeMoney } from '../redux';

import ServicesContainer from '../components/ServicesContainer';

const MyOrders = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, money } = useSelector(state => state.userReducer);
  // Запрос

  const [userMoney, setUserMoney] = useState(money);
  const [userOrder, setUserOrder] = useState([
    {
      _id: 0,
      nameOfCleaner: 'Zakhar cleaning',
      name: 'ggwp asdads as asd ad asd ',
      price: 30,
      status: 'Waiting',
    },
    {
      _id: 1,
      nameOfCleaner: 'Vadim',
      name: 'ggwp',
      price: 30,
      status: 'Waiting',
    },
    {
      _id: 2,
      nameOfCleaner: 'Maks',
      name: 'ggwp',
      price: 30,
      status: 'Finished',
    },
  ]);

  useEffect(() => dispatch(onChangeMoney(userMoney)), [userMoney]);

  const dellOrder = service =>
    Alert.alert('Order list', 'Delete this order?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Submit',
        onPress: () => {
          setUserMoney(prevMoney => (prevMoney += service.price));
          setUserOrder(prevOrder =>
            prevOrder.filter(item => item._id !== service._id),
          );

          // отправка в БД
        },
      },
    ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My orders</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.moneyText}>Your money: {userMoney}</Text>

        <ServicesContainer
          editServices={dellOrder}
          userServices={userOrder}
          btnText={'Delete'}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>To all cleaners</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    alignSelf: 'center',
    letterSpacing: 1,
    color: '#FFF',
  },
  body: { flex: 9 },
  moneyText: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 20,
    fontWeight: '400',
    alignSelf: 'center',
    letterSpacing: 1,
    color: '#FFF',
  },
});

export default MyOrders;
