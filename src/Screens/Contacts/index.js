import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image, Keyboard,
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

const data = [
    {
        image: Images.soundWaves,
        title: 'Echo',
        text: 'Talk to me to test audio',
        id: 0,
        onPress: () => Navigator.navigate('RecordAudio')
    },
];

export default function Contacts() {
    const [page, setPage] = useState(1)
    const [contacts, setContacts] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)
    const [isDataLoaded, setDataLoaded] = useState(false)
    const pageSize = 10
    const isFocused = useIsFocused();

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

    const renderItem = ({item}) => {
        const {name, email, image, onPress} = item;
        return (
          <ContactsItem item={item} onPress={()=>{
              Navigator.navigate("CallScreen",{contact:item})}
          }/>
        );
    };

    return (
        <RootView statusBar={Colors.lightGrey} isLoading={onLoadingContacts}>
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
