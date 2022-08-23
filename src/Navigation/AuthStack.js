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
import {useSelector} from 'react-redux';
import {onBoardingReducer} from "../Store/reducers/onBoardingReducer";
import ChangePassword from "../Screens/ChangePassword";

const Stack = createStackNavigator();

const IntroStack = () => {
    const {isOnBoadring} = useSelector(
        ({onBoardingReducer: {isOnBoadring = true} = {}}) => ({
            isOnBoadring,
        }),
    );
    return(
    <Stack.Navigator
        initialRouteName={isOnBoadring ? "SignIn" : "Intro"}
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name='Intro' component={Intro}/>
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
        <Stack.Screen name='Verification' component={Verification}/>
        <Stack.Screen name='CreateProfile' component={CreateProfile}/>
        <Stack.Screen name='ChangePassword' component={ChangePassword}/>
    </Stack.Navigator>
    )
}

export default IntroStack;
