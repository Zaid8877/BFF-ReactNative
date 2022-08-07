import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import Languages from '../Screens/Languages';
import Audio from '../Screens/Audio';
import AlertTones from '../Screens/AlertTones';
import Restrictions from '../Screens/Restrictions';
import History from '../Screens/History';
import AdvancedSettings from '../Screens/AdvancedSettings';
import PushToTalk from '../Screens/PushToTalk';
import ThirdPartyInfo from '../Screens/ThirdPartyInfo';
import ReportProblem from '../Screens/ReportProblem';
import Support from '../Screens/Support';
import Themes from '../Screens/Themes';
import Options from '../Screens/Options';
import Messaging from '../Screens/Messaging';
import Chat from '../Screens/Chat';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import RecordAudio from '../Screens/RecordAudio';
import DrawerNavigator from './DrawerNavigation'
import Connect from '../Screens/Connect';
import QRScanner from '../Screens/QRScanner';
import useUserState from "../CustomHooks/useUserState";
import CreateProfile from "../Screens/CreateProfile";
import {logToConsole} from "../Configs/ReactotronConfig";

const Stack = createStackNavigator();

const HomeStack = () => {
    const userInfo = useUserState()
    logToConsole(userInfo)
    return (<Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            {!userInfo.cell_no&&
            <Stack.Screen name='CreateProfile' component={CreateProfile}/>}
            <Stack.Screen name="Home" component={DrawerNavigator}/>
            <Stack.Screen name="RecordAudio" component={RecordAudio}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Chat" component={Chat}/>
            <Stack.Screen name="Messaging" component={Messaging}/>
            <Stack.Screen name="Options" component={Options}/>
            <Stack.Screen name="Themes" component={Themes}/>
            <Stack.Screen name="Support" component={Support}/>
            <Stack.Screen name="ReportProblem" component={ReportProblem}/>
            <Stack.Screen name="ThirdPartyInfo" component={ThirdPartyInfo}/>
            <Stack.Screen name="PushToTalk" component={PushToTalk}/>
            <Stack.Screen name="AdvancedSettings" component={AdvancedSettings}/>
            <Stack.Screen name="History" component={History}/>
            <Stack.Screen name="Restrictions" component={Restrictions}/>
            <Stack.Screen name="AlertTones" component={AlertTones}/>
            <Stack.Screen name="Audio" component={Audio}/>
            <Stack.Screen name="Languages" component={Languages}/>
            <Stack.Screen name="Connect" component={Connect}/>
            <Stack.Screen name="QrScanner" component={QRScanner}/>

        </Stack.Navigator>
    )
}

export default HomeStack;
