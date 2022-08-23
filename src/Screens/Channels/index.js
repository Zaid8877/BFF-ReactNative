import {View, Text, FlatList, Keyboard, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Item from '../../Components/Item';
import {Colors, Metrics} from '../../Theme';
import Images from '../../Utils/Images';
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {API_STATUS} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";
import NoRecordFound from "../../Components/NoRecordFoundComponent";
import Navigator from "../../Utils/Navigator";
import {useIsFocused} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const data = [
    {
        image: Images.person2,
        title: 'Ralph Edwards',
        text: 'ralphedwards1',
        id: 0,
    },
];

const Channels=({route}) =>{
    const {isFromMenu} = route.params
    const [page, setPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(0)
    const [isDataLoaded, setDataLoaded] = useState(false)
    const [channels, setChannels] = useState([])
    const pageSize = 10
    const isFocused = useIsFocused();

    useEffect(() => {
        getChannels(false).then()
    }, [])
    useEffect(() => {
        if (isFocused) {
            getChannels(true).then()
        }
    }, [isFocused]);
    const {
        onCallApi: onCallGetChannelsApi,
        loading: onLoadingChannels,
    } = useApiWrapper({
        type: REQUEST_METHOD.GET,
        endPoint: ApiService.channels.getAllMyChannels
    });

    const getChannels = async (replaceData) => {
        Keyboard.dismiss();

        const loginResponse = await onCallGetChannelsApi({}, '?page_no=' + page + '&page_size=' + pageSize);
        const {ok = false, status, data = {}} = loginResponse || {};
        setDataLoaded(true)
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if (data.error) {
                showToast(data.message)
            } else {
                setChannels(replaceData ? data.data : channels.length === 0 ? data.data : channels.concat(data.data))
                setTotalRecords(data.totalRecords)
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }
    const openCreateChannel = ()=>{
        Navigator.navigate('CreateChannel')
    }
    return (
        <RootView statusBar={Colors.lightGrey} showCircle isLoading={onLoadingChannels}>
            <Header secondary={true} title="Channels" showAddIcon={true} leftIcon= {isFromMenu?'menu' : 'chevron-left'}
                    onPressLeft={()=>{
                        if(isFromMenu)
                            Navigator.openDrawer()
                        else
                            Navigator.goBack()
                    }}
                    onPressRight={() => openCreateChannel()}/>
            <FlatList
                style={{paddingTop: Metrics.defaultMargin}}
                data={channels}
                keyExtractor={item => item.id}
                ListEmptyComponent={isDataLoaded ? <NoRecordFound message={"No Channels Found"}/> : null}
                renderItem={({item}) => (
                    <Item
                        showIcon={false}
                        item={item}
                        style={{backgroundColor: Colors.lightGrey}}
                        onPress={(id)=>{Navigator.navigate("ChannelDetail", {channel:item})}}
                    />
                )}
            />
        </RootView>
    );
}


const styles = StyleSheet.create({
    iconViewGenerateCall: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Channels
