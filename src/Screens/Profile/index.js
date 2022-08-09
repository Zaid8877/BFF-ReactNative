import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Images from '../../Utils/Images';
import {Colors, Metrics} from '../../Theme';
import Input from '../../Components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';
import useUserState from "../../CustomHooks/useUserState";

export default function Profile() {
  const userInfo=useUserState()
  const renderItem = (text, onPress = () => {}, icon = 'pencil-outline') => {
    return  (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View style={styles.item}>
          <Text style={styles.text}>{text}</Text>
          <Icon name={icon} size={24} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <RootView>
      <Header title={userInfo.name} />
      <ScrollView style={{flex: 1}}>
        <Image source={Images.person} style={styles.image} />
        <Input
          multiline
          style={{
            height: 120,
            paddingTop: 20,
            marginHorizontal: Metrics.defaultMargin,
            marginTop: Metrics.defaultMargin,
          }}
          placeholder="About"
        />
        {renderItem('Name')}
        {renderItem('Location')}
        {renderItem('Website')}
        {renderItem(
          'Language',
          () => Navigator.navigate('Languages'),
          'chevron-right',
        )}
      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.3,
  },
  item: {
    backgroundColor: Colors.lightGrey,
    marginHorizontal: Metrics.defaultMargin,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.defaultMargin,
    paddingVertical: Metrics.smallMargin,
    marginBottom: Metrics.defaultMargin,
  },
  text: {
    fontSize: 16,
  },
});
