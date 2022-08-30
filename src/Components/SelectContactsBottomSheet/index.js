import React, {useEffect, useRef, useState} from 'react';
import {
    BackHandler, FlatList,
    Image,
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {API_STATUS, APP_STRINGS} from '../../Constants';

import BottomSheet from '../../Components/BottomSheet/BottomSheet';
import Spinner from 'react-native-loading-spinner-overlay';
import {CustomerLoader} from '../../Components/RootView/index';
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {showToast} from "../../Utils/ToastUtils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NoRecordFound from "../NoRecordFoundComponent";
import {Metrics} from "../../Theme";
import colors from "../../Theme/Colors";
import ContactsItem from "../ContactsItem/ContactsItem";
import Button from "../Button";
import {logToConsole} from "../../Configs/ReactotronConfig";


const SelectedContactsBottomSheet = ({isVisible, selectedContacts, onBackKeyPress, onDoneButtonPressed}) => {
    const [isDataLoaded, setIsDataLoading] = useState(false);
    const [contacts, setContacts] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)
    const [noContactSelected, setNoContactSelected] = useState(true)

    useEffect(() => {
        if (isVisible) {
            setContacts([])
            setIsDataLoading(false);
            setNoContactSelected(true)
            getContacts().then();
        }
    }, [isVisible]);
    const {
        onCallApi: onCallGetContactsApi,
        loading: onLoadingContacts,
    } = useApiWrapper({
        type: REQUEST_METHOD.GET,
        endPoint: ApiService.contact.geAllContact
    });

    const getContacts = async () => {

        const loginResponse = await onCallGetContactsApi();
        const {ok = false, status, data = {}} = loginResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            setIsDataLoading(true)
            if (data.error) {
                showToast(data.message)
            } else {
                let newContacts = data.data
                newContacts.map((item, index) => {
                    selectedContacts.map(selectedItem => {
                        logToConsole({item:item.id,selected:selectedItem.id})
                        if (item.id === selectedItem.id)
                        newContacts[index].isSelected = true;
                    })
                })
                setContacts(newContacts)
                setTotalRecords(data.totalRecords)
                updateNoContactSeletedValue()
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <ContactsItem item={item} isSelected={item.isSelected} onPress={() => {
                const newArray = [...contacts];
                newArray[index].isSelected = !newArray[index].isSelected;
                setContacts(newArray)
                updateNoContactSeletedValue()
            }}/>
        );
    };
    const updateNoContactSeletedValue = () => {
        setNoContactSelected(contacts.filter(item => {
            return item.isSelected
        }).length === 0)
    }
    const renderContacts = () => {
        return (
            <View style={{flex: 1, flexDirection: "column"}}>
                <FlatList
                    style={{paddingTop: Metrics.defaultMargin, flex: 1}}
                    data={contacts}
                    ListEmptyComponent={isDataLoaded ? <NoRecordFound message={"No Contacts Found"}/> : null}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />

                <Button text='Done' disabled={noContactSelected}
                        style={{marginLeft: 20, marginRight: 20, marginBottom: 30}}
                        onPress={() => onDoneButtonPressed(contacts.filter(renderItem => {
                            return renderItem.isSelected
                        }))}/>
            </View>
        )
    }
    const renderLoader = () => {
        return <Spinner
            visible={onLoadingContacts}
            customIndicator={<CustomerLoader/>}
            color={colors.primary}
        />
    }
    return (
        <BottomSheet
            visible={isVisible}
            title="Select Contacts"
            onBackPress={() => {
                onBackKeyPress();
            }}
            backPressIcon={'chevron-left'}
        >
            <View style={styles.mainContainer}>
                {renderContacts()}
                {renderLoader()}
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    mainContainer: {flex: 1},
    item: {
        backgroundColor: colors.secondary,
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
        backgroundColor: colors.white,
        padding: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
        tintColor: colors.primary,
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


export default SelectedContactsBottomSheet;
