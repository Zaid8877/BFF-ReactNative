/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import {Colors, Metrics} from '../../Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionItem from '../../Components/OptionItem';

const data = [
  {
    title: 'Available',
    text: 'Receive live messages',
    icon: 'check',
  },
  {
    title: 'Solo',
    text: 'Receive live messages from selected contacts only. Others are saved to history',
    icon: 'check',
  },
  {
    title: 'Busy',
    text: 'Receive visual notifications and save messages in history',
    icon: 'check',
  },
  {
    title: 'Offline',
    text: 'Receive live messages',
    icon: null,
  },
];

export default function Status() {
  const [index, setIndex] = useState(0);

  const renderItem = (item, ind) => {
    const {title, text, icon} = item;
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => setIndex(ind)}>
        <View style={styles.item}>
          <View
            style={[
              styles.iconView,
              {
                backgroundColor: title=='Solo' ? Colors.blue : icon ? 'green' : Colors.lightGrey,
                borderWidth: icon ? 0 : 2,
              },
            ]}>
            {icon && title!=='Solo' ? <Icon name={icon} color="white" size={24} /> : null}
            {title=='Solo' ? <Text style={{color:'white',fontSize:20}}>|</Text> : null}
          </View>
          <View style={styles.textView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
          {index == ind ? (
            <Icon name="check" color={Colors.primary} size={26} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <RootView statusBar={Colors.lightGrey}>
      <Header secondary title="Status" showAddIcon={false} />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: Metrics.defaultMargin,
          paddingTop: Metrics.defaultMargin,
        }}>
        {data.map((item, ind) => renderItem(item, ind))}
        <Text>Behavior</Text>
        <OptionItem
          item={{
            text: 'Change to Available when talk button is pressed',
            type: 'switch',
          }}
          style={{
            backgroundColor: Colors.lightGrey,
            borderRadius: 10,
            marginHorizontal: 0,
            paddingLeft: Metrics.defaultMargin,
            borderBottomWidth: 0,
            marginTop: 10,
          }}
        />
      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey,
    padding: Metrics.defaultMargin,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: Metrics.defaultMargin,
  },
  iconView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
  },
  textView: {
    marginLeft: 10,
    width: '80%',
  },
});
