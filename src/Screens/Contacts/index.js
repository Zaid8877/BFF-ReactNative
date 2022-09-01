import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image, Keyboard, Button, Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Item from '../../Components/Item';
import {Colors, Metrics} from '../../Theme';
import Images from '../../Utils/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {API_STATUS} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";
import NoRecordFound from "../../Components/NoRecordFoundComponent";
import {useIsFocused} from '@react-navigation/native';
import ContactsItem from "../../Components/ContactsItem/ContactsItem";
import {Swipeable} from "react-native-gesture-handler";

import {useDispatch} from "react-redux";
import {setRecentChannel} from '../../Store/actions/RecentChannelActions'
import useRecentChannelState from "../../CustomHooks/useRecentChannelState";
export default function Contacts() {
    const dispatch= useDispatch()
    let recentCalls = useRecentChannelState();

    const [page, setPage] = useState(1)
    const [contacts, setContacts] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)
    const [isDataLoaded, setDataLoaded] = useState(false)
    const pageSize = 10
    const isFocused = useIsFocused();
    let row  = []
    let prevOpenedRow;

    useEffect(() => {
        getContacts(false).then()
    }, [])
    useEffect(() => {
        if (isFocused) {
            getContacts(true).then()
        }
    }, [isFocused]);
    const {
        onCallApi: onCallGetContactsApi,
        loading: onLoadingContacts,
    } = useApiWrapper({
        type: REQUEST_METHOD.GET,
        endPoint: ApiService.contact.geAllContact
    });

    const getContacts = async (replaceData) => {
        Keyboard.dismiss();

        const loginResponse = await onCallGetContactsApi({}, '?page_no=' + page + '&page_size=' + pageSize);
        const {ok = false, status, data = {}} = loginResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            setDataLoaded(true)
            if (data.error) {
                showToast(data.message)
            } else {
                setContacts(replaceData ? data.data : contacts.length === 0 ? data.data : contacts.concat(data.data))
                setTotalRecords(data.totalRecords)
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }
    const {
        onCallApi: onCallApiToDeleteContact,
        loading: onLoadingDeleteContact,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: ApiService.contact.deleteContact
    });

    const onDeleteContact = async (item, index) => {

        const param={
            contact_id: item.id
        }
        const loginResponse = await onCallApiToDeleteContact(param)
        const {ok = false, status, data = {}} = loginResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            setDataLoaded(true)
            if (data.error) {
                showToast(data.message)
            } else {
                showToast(data.message)
                deleteContactFromRecents(item)
                deleteItem(item,index)
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }

    const renderItem = ({item, index}) => {
        const closeRow = (index) => {
            console.log('closerow');
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
                prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        };

        const renderRightActions = (progress, dragX, onClick) => {
            return (
                <View
                    style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems:'center',
                        alignSelf:'center',
                        marginBottom:30,
                        marginRight:15,
                        marginLeft:15
                    }}>
                    <TouchableOpacity activeOpacity={0.9} onPressIn={onClick}>
                        <Image source={Images.delete} style={{tintColor:Colors.red, width:50, height:50}}/>
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, ()=>{
                        showDeleteAlert(item,index)
                    })
                }
                onSwipeableOpen={() => closeRow(index)}
                ref={(ref) => (row[index] = ref)}
                rightOpenValue={-100}>
                <ContactsItem item={item} onPress={() => {
                    Navigator.navigate("CallScreen", {contact: item})
                }
                }/>
            </Swipeable>
        );
    };

    const showDeleteAlert = (item, index) => {
        Alert.alert("Confirmation","Are you sure you want to delete this icon?" ,
            [{
                text:"Yes",
                onPress: ()=>{onDeleteContact(item,index)},
                style: 'default'
            },{
            text:'Cancel',
                style: 'cancel',
                onPress:()=>{}
            }]);
    }
const deleteContactFromRecents=(item)=>{

    let arr = []
    recentCalls.map((itemChannel,index)=>{
        if(itemChannel.callType === "contact" && item.id === itemChannel.id){
        }
        else{
            arr.push(itemChannel)
        }

    })

    dispatch(setRecentChannel(arr))
}
    const deleteItem = (item, index) => {
        console.log(item, index);
        let a = contacts;
        a.splice(index, 1);
        console.log(a);
        setContacts([...a]);
    };


    return (
        <RootView statusBar={Colors.lightGrey} isLoading={onLoadingContacts||onLoadingDeleteContact}>
            <Header secondary title="Contacts" //text='No contacts, tap "+" to add'
                    onPressRight={() => Navigator.navigate('Connect')}/>

            <FlatList
                style={{paddingTop: Metrics.defaultMargin}}
                data={contacts}
                ListEmptyComponent={isDataLoaded ? <NoRecordFound message={"No Contacts Found"}/> : null}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </RootView>
    )
        ;
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.secondary,
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
        color: 'white',
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});
