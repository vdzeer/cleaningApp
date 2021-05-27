import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { onChangeMoney } from '../redux';

import { BASE_URL } from '../utils/AppConst';
import post from '../utils/Fetch';

import { w } from '../utils/AppConst';

const MyOrders = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token, money } = useSelector(state => state.userReducer);

  const [userMoney, setUserMoney] = useState(money);
  const [userOrders, setUserOrders] = useState(null);

  const getUserOrders = async () => {
    const orders = await post(`${BASE_URL}/users/getOrders`, 'POST', {
      token: token,
    });
    setUserOrders(orders);
  };

  useEffect(() => getUserOrders(), []);

  useEffect(() => dispatch(onChangeMoney(userMoney)), [userMoney]);

  const dellOrder = service =>
    Alert.alert('Order list', 'Delete this order?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Submit',
        onPress: async () => {
          if (
            service.status.toLowerCase() === 'return' ||
            service.status.toLowerCase() === 'waiting'
          )
            setUserMoney(
              userMoney +
                service.services.reduce((acc, item) => acc + +item.price, 0),
            );

          setUserOrders(prevOrder =>
            prevOrder.filter(item => item._id !== service._id),
          );

          const dellOrder = await post(
            `${BASE_URL}/users/deleteOrder`,
            'POST',
            {
              id: service._id,
            },
          );
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

        <ScrollView>
          {userOrders &&
            userOrders.map((item, index) => (
              <View style={styles.serviceBlock} key={index}>
                <View style={styles.service}>
                  {item.services.map((el, ind) => (
                    <View key={ind}>
                      <Text style={styles.textBold}>{el.nameOfService}</Text>
                      <Text style={styles.textBold}>{el.price}</Text>
                    </View>
                  ))}

                  <Text style={styles.text}>{`Status: ${item.status}`}</Text>
                  {item && item.status.toLowerCase() === 'return' ? (
                    <Text
                      style={styles.text}>{`Comment: ${item.comment}`}</Text>
                  ) : null}
                </View>
                <View style={styles.addBtn}>
                  <TouchableOpacity onPress={() => dellOrder(item)}>
                    <Text style={styles.textBtn}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
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

export default MyOrders;
