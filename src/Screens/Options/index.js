import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import {Colors, Metrics} from '../../Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';

const options = [
  {
    icon: 'volume-high',
    text: 'Audio',
    onPress: () => Navigator.navigate('Audio'),
    color: '#db0507',
  },

  {
    icon: 'bell-ring-outline',
    text: 'AlertTones',
    onPress: () => Navigator.navigate('AlertTones'),
    color: '#3cd537',
  },
  {
    icon: 'clock-outline',
    text: 'History',
    onPress: () => Navigator.navigate('History'),
    color: '#3046d3',
  },
  {
    icon: 'microphone-outline',
    text: 'Push-to-talk',
    onPress: () => Navigator.navigate('PushToTalk'),
    color: '#eba23d',
  },
  {
    icon: 'lock-outline',
    text: 'Restrictions',
    onPress: () => Navigator.navigate('Restrictions'),
    color: '#dfe241',
  },
  {
    icon: 'palette-outline',
    text: 'Themes',
    onPress: () => Navigator.navigate('Themes'),
    color: '#3dd8d4',
  },
  {
    icon: 'help',
    text: 'Support',
    onPress: () => Navigator.navigate('Support'),
    color: '#b145c7',
  },
];

export default function Options() {
  const renderItem = ({icon, text, onPress, color}) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={styles.item}>
          <View style={styles.row}>
            <View style={[styles.iconView, {backgroundColor: `${color}aa`}]}>
              <Icon name={icon} size={30} color={color} />
            </View>
            <Text style={styles.text}>{text}</Text>
          </View>
          <Icon name="chevron-right" size={36} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <RootView statusBar={Colors.lightGrey}>
      <Header secondary title="Options" showAddIcon={false}/>
      <ScrollView style={{flex: 1}}>
        {options.map(item => renderItem(item))}
      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Metrics.defaultMargin,
    paddingVertical: Metrics.defaultMargin,
    borderBottomWidth: 0.5,
    borderColor: Colors.darkGrey,
  },
  iconView: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGrey,
  },
});
