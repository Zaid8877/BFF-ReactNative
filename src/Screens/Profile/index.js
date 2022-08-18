import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity, TextInput,
} from 'react-native';
import React, {useState} from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Images from '../../Utils/Images';
import {Colors, Metrics} from '../../Theme';
import Input from '../../Components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';
import useUserState from "../../CustomHooks/useUserState";
import ImageComponentLoader from "../../Components/ImageComponentLoader";

export default function Profile() {
  const userInfo=useUserState()
  const getInitialState=(user)=> {
    return {
      name: user ? user.name : '',
      user_name: user ? user.user_name : '',
      cell_no: user ? user.cell_no : '',
      email: user ? user.email : '',
      image: user?user.profile_pic:''
    }
  }
  const [state, setState] = useState(getInitialState(userInfo))
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
const isUpdatingProfile = false;
  return (
    <RootView isLoading={isUpdatingProfile}>
      <Header title={userInfo.name}  />
      <ScrollView style={{flex: 1}}>
        <ImageComponentLoader source={state.image} containerStyle={styles.image} />
        <View
          multiline
          style={{
            marginTop: Metrics.defaultMargin,
          }}/>

        <View style={styles.item}>
          <Text style={styles.headingTextInput}>Name</Text>

          <TextInput editable={false} style={styles.text} placeholder={"Name"}>{state.name}</TextInput>
        </View>
        <View style={styles.item}>
          <Text style={styles.headingTextInput}>Display Name</Text>

          <TextInput editable={false} style={styles.text} placeholder={"Display Name"}>{state.user_name}</TextInput>
        </View>
        <View style={styles.item}>
          <Text style={styles.headingTextInput}>Phone Number</Text>

          <TextInput editable={false} style={styles.text} placeholder={"Phone Number"}>{state.cell_no}</TextInput>
        </View>
        <View style={styles.item}>
          <Text style={styles.headingTextInput}>Email</Text>
          <TextInput editable={false} style={styles.text} placeholder={"Email"}>{state.email}</TextInput>
        </View>
        {/*{renderItem('Name')}*/}
        {/*{renderItem('Location')}*/}
        {/*{renderItem('Website')}*/}
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
    alignItems:'center',
    backgroundColor: Colors.lightGrey,
    marginHorizontal: Metrics.defaultMargin,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.defaultMargin,
    paddingVertical: Metrics.smallMargin,
    marginBottom: Metrics.defaultMargin,
  },
  headingTextInput:{marginRight:10, fontSize:10, backgroundColor:Colors.white, padding:2,position:'absolute',top:-5, left:5},
  text: {
    flex:1,
    fontSize: 16,
  },
});
