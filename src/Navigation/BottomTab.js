import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import { Colors } from '../Theme';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.grey,
            tabBarLabelStyle: { fontWeight: 'bold' }
        }}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Icon name='home-outline' size={28}
                            color={focused ? Colors.primary : Colors.grey} />,

                }} />
            <Tab.Screen
                name="Search"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Icon name='magnify' size={28}
                            color={focused ? Colors.primary : Colors.grey} />,

                }} />
            <Tab.Screen
                name="Record"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Icon name='video-outline' size={28}
                            color={focused ? Colors.primary : Colors.grey} />,

                }} />
            <Tab.Screen
                name="Saved"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Icon name='bookmark-outline' size={28}
                            color={focused ? Colors.primary : Colors.grey} />,

                }} />
            <Tab.Screen
                name="Settings"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Feather name='settings' size={28}
                            color={focused ? Colors.primary : Colors.grey} />,

                }} />
        </Tab.Navigator>
    )
}

