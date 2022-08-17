import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    StatusBar,
    Button
} from 'react-native';
import React, {useState} from 'react';
import RootView from '../../Components/RootView';
import {Colors, Metrics} from '../../Theme';
import Images from '../../Utils/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';
import Entypo from 'react-native-vector-icons/Entypo';
import {useInitializeAgora, useRequestAudioHook} from '../../Components/Hooks/hooks';
import useRecentChannelState from "../../CustomHooks/useRecentChannelState";
import Item from "../../Components/Item";
import {logToConsole} from "../../Configs/ReactotronConfig";
import NoRecordFound from "../../Components/NoRecordFoundComponent";
import ContactsItem from "../../Components/ContactsItem/ContactsItem";

export default function Home() {
    useRequestAudioHook();
    var recentChannelList = useRecentChannelState()
    logToConsole(recentChannelList)
    const [loadingRecentChannelList, setLoadingRecentChannelList] = useState(false)
    // const {
    //     channelName,
    //     isMute,
    //     isSpeakerEnable,
    //     joinSucceed,
    //     peerIds,
    //     setChannelName,
    //     joinChannel,
    //     leaveChannel,
    //     toggleIsMute,
    //     toggleIsSpeakerEnable,
    // } = useInitializeAgora();

    const renderItem = ({item, index}) => {
        if(item.callType === "contact") {
         return <ContactsItem
             showIcon={false}
             item={item}
             style={{backgroundColor: Colors.lightGrey}}
             onPress={(id) => {
                 Navigator.navigate("CallScreen", {contact: item})
             }}
         />
        }
        else{
            return <Item
                showIcon={false}
                item={item}
                style={{backgroundColor: Colors.lightGrey}}
                onPress={(id) => {
                    Navigator.navigate("ChannelDetail", {channel: item})
                }}
            />
        }
    }

    const createChannelView = () => {
        return <View style={
            {alignContent: 'flex-end', alignSelf: 'flex-end', marginVertical: 20, marginHorizontal:20}
        }>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                Navigator.push("Channels", {isFromMenu:false})
            }} style={styles.iconViewGenerateCall}>
                <Icon name='plus' size={32} color='white'/>
            </TouchableOpacity>
        </View>
    }
    const renderListEmptyComponent = () => {
        return createChannelView()
    }
    return (
        <RootView statusBar={Colors.primary} isLoading={loadingRecentChannelList}>
            <StatusBar backgroundColor={Colors.primary} barStyle='light-content'/>
            <View style={styles.header}>
                <Icon name="menu" color={Colors.white} size={32} onPress={() => Navigator.openDrawer()}/>
                {/*<Icon name="chat" color={Colors.white} size={32} onPress={() => Navigator.navigate('Messaging')}/>*/}
            </View>

            <View style={[styles.item]}>
                {/*<View style={styles.imageView}>*/}
                {/*    <Image source={Images.soundWaves} style={styles.image}/>*/}

                {/*    <View style={styles.iconView}>*/}
                {/*        <Icon name="check" color="white"/>*/}
                {/*    </View>*/}
                {/*</View>*/}
                <View style={styles.textView}>
                    <Text style={[styles.heading]}>{'Recent Channels'}</Text>
                    {/*<Text style={[styles.text]}>{'Talk to me to test the audio'}</Text>*/}
                </View>
            </View>

            <FlatList data={recentChannelList} keyExtractor={(item, index) => item ? item.id : index}
                      renderItem={renderItem}
                      ListEmptyComponent={<NoRecordFound message={"No Calls Found"}/>}
            />
            {createChannelView(recentChannelList && recentChannelList.size > 0)}

            {/*<View style={{flex:1,justifyContent:'center'}}>*/}
            {/*<Button
            onPress={peerIds.length > 2 ? alert('Only 2 User are Allowed in the Channel') : joinSucceed ? leaveChannel : joinChannel}
            title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
          />*/}

            {/*{joinSucceed &&*/}
            {/*<>*/}
            {/*          <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:26}}>Connection Status</Text>*/}
            {/*          <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:16}}>{peerIds.length > 1 ? 'Connected' : 'Ringing'}</Text>*/}
            {/*          </>*/}
            {/*}*/}
            {/*          <TouchableOpacity style={{width:150,height:150,backgroundColor:joinSucceed ? 'red' : 'pink',alignSelf:'center',borderRadius:120}} onPress={ joinSucceed ? leaveChannel : joinChannel}>*/}
            {/*            <Text style={{alignSelf:'center',marginTop:60,color:joinSucceed ? 'white' : 'black'}}>{joinSucceed ? 'End Call' : 'Make a Call'}</Text>*/}
            {/*          </TouchableOpacity>*/}
            {/*      /!* <TouchableOpacity*/}
            {/*        activeOpacity={0.9}*/}
            {/*        onPress={peerIds.length > 2 ? alert('Only 2 User are Allowed in the Channel') : joinSucceed ? leaveChannel : joinChannel}>*/}
            {/*        <View style={styles.outerView}>*/}
            {/*          <View style={styles.innerView}>*/}
            {/*            <Icon name="microphone" color={Colors.white} size={150} />*/}
            {/*          </View>*/}
            {/*        </View>*/}
            {/*      </TouchableOpacity> *!/*/}
            {/*      </View>*/}

            {/*      <View style={{paddingVertical:Metrics.defaultMargin}}>*/}
            {/*      <View style={styles.bottomView}>*/}
            {/*        <View style={[styles.row,{width:'30%'}]}>*/}
            {/*          <Entypo name='signal' style={styles.icon} />*/}
            {/*          <Icon name='play-circle-outline' style={[styles.icon, { marginLeft: 30 }]} />*/}
            {/*        </View>*/}

            {/*        <View style={[styles.row, styles.status]}>*/}
            {/*          <Icon name='checkbox-marked-circle' color='white' size={20} />*/}
            {/*          <Text style={{ color: Colors.light, fontSize: 16, marginLeft: 5 }}>Available</Text>*/}
            {/*        </View>*/}

            {/*        <View style={[styles.row,{width:'30%'}]}>*/}
            {/*          <Icon name='signal' style={styles.icon} />*/}
            {/*        </View>*/}

            {/*      </View>*/}
            {/*      </View>*/}
        </RootView>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.primary,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: Metrics.defaultMargin,
        marginBottom: Metrics.defaultMargin,
        overflow: 'hidden',
    },
    imageView: {
        width: Metrics.screenWidth * 0.15,
        height: Metrics.screenWidth * 0.15,
        borderRadius: Metrics.screenWidth * 0.15,
        backgroundColor: Colors.white,
        padding: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
        tintColor: Colors.primary,
    },
    iconView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderColor: 'white',
        borderWidth: 1,
        zIndex: 10,
    },
    textView: {
        marginLeft: Metrics.defaultMargin,
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.white,
    },
    text: {
        fontSize: 16,
        color: Colors.white,
    },
    header: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Metrics.defaultMargin,
    },
    outerView: {
        width: Metrics.screenWidth * 0.7,
        height: Metrics.screenWidth * 0.7,
        borderRadius: Metrics.screenWidth * 0.5,
        backgroundColor: Colors.primary,
        alignSelf: 'center',
        padding: 10,
    },
    innerView: {
        width: '100%',
        height: '100%',
        borderColor: Colors.white,
        borderWidth: 5,
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: Metrics.defaultMargin
    },
    status: {
        backgroundColor: 'green',
        borderRadius: 30,
        padding: 10,
        width: '30%',
        marginHorizontal: '5%'
    },
    icon: {
        color: Colors.primary,
        fontSize: 20,
    },
    iconViewGenerateCall: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
