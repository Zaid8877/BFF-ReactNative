import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import SignIn from '../Screens/SignIn'
import SignUp from '../Screens/SignUp'
import ForgotPassword from '../Screens/ForgotPassword'
import Verification from '../Screens/Verification'
import CreateProfile from '../Screens/CreateProfile'
import Intro from '../Screens/Intro';

const Stack = createStackNavigator();

const IntroStack = () => (
    <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name='Intro' component={Intro} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='Verification' component={Verification} />
        <Stack.Screen name='CreateProfile' component={CreateProfile} />
    </Stack.Navigator>
);

export default IntroStack;