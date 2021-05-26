import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { onChangeMoney } from '../redux';

import Button from '../components/Button';
import ServicesContainer from '../components/ServicesContainer';

const Cleaner = ({ route, navigation }) => {
  const { id } = route.params;

  const dispatch = useDispatch();
  const { user, money } = useSelector(state => state.userReducer);

  const [userMoney, setUserMoney] = useState(money);
  const [userOrder, setUserOrder] = useState([]);

  const addService = service => {
    setUserOrder(prevOrder => [...prevOrder, service]);
    setUserMoney(prevMoney => (prevMoney -= service.price));
  };

  const onCreateOrder = () =>
    Alert.alert(
      'Order list',
      userOrder.reduce(
        (acc, item) => (acc += `${item.name} : ${item.price}\n`),
        '',
      ),
      [
        {
          text: 'Cancel',
          onPress: () => {
            setUserMoney(money);
            setUserOrder([]);
          },
        },
        {
          text: 'Submit',
          onPress: () => {
            dispatch(onChangeMoney(userMoney));
            // отправка в БД
            navigation.navigate('Home');
          },
        },
      ],
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Zakhar cleaner</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.moneyText}>Your money: {userMoney}</Text>

        <ServicesContainer id={id} editServices={addService} btnText={'Add'} />

        {userOrder.length !== 0 && (
          <Button text={'Create order'} onBtnPress={onCreateOrder} />
        )}
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
    backgroundColor: '#295FED',
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
    backgroundColor: '#295FED',
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

export default Cleaner;
