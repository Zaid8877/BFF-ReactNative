import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Accounts from '../Screens/Accounts';
import Status from '../Screens/Status';
import Options from '../Screens/Options';
import Recents from '../Screens/Recents';
import Channels from '../Screens/Channels';
import Contacts from '../Screens/Contacts';
import CustomDrawer from '../Components/CustomDrawer';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Colors, Metrics} from '../Theme';
import Home from '../Screens/Home';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
      drawerStyle={{width:'100%'}}
      drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              name="home"
              size={24}
              color={focused ? Colors.white : Colors.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Accounts"
        component={Accounts}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="user"
              size={24}
              color={focused ? Colors.white : Colors.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Status"
        component={Status}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="checkcircle"
              size={24}
              color={focused ? Colors.white : Colors.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Recents"
        component={Recents}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="clockcircle"
              size={24}
              color={focused ? Colors.white : Colors.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contacts"
        component={Contacts}
        options={{
          drawerIcon: ({focused, size}) => (
            <Feather
              name="users"
              size={24}
              color={focused ? Colors.white : Colors.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Channels"
        component={Channels}
        options={{
          drawerIcon: ({focused, size}) => (
            <FontAwesome
              name="group"
              size={24}
              color={focused ? Colors.white : Colors.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Options"
        component={Options}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="setting"
              size={24}
              color={focused ? Colors.white : Colors.primary}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
