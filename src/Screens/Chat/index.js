import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import RootView from '../../Components/RootView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Metrics } from '../../Theme';
import Navigator from '../../Utils/Navigator';
import Images from '../../Utils/Images';
import ChatBubble from '../../Components/ChatBubble';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../../Theme/Colors';

const data = [
  {
    userId: 1,
    image: Images.person,
    text: 'Hellooo.',
  },
  {
    userId: 2,
    image: Images.person2,
    text: 'Hellooo. Whats up?',
  },
  {
    userId: 2,
    image: Images.person2,
    text: 'Lorum ipsum is a dummy text',
  },
  {
    userId: 1,
    image: Images.person,
    text: 'Hahahahahahahah hahah hahaha hahahhah hahah',
  },
  {
    userId: 2,
    image: Images.person2,
    text: 'Hellooo. Whats up?',
  },
];

export default function Chat() {

  const [messages, setMessages] = useState(data)
  const [text, setText] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)


  const renderHeader = () => {
    return (
      <View style={[styles.row, styles.header]}>
        <View style={styles.row}>
          <Icon
            name="chevron-left"
            size={36}
            onPress={() => Navigator.goBack()}
          />
          {searchOpen ? 
          <>
          <TextInput style={styles.searchInput} placeholder='Search' />
            <Icon name='close' size={26} style={styles.closeIcon} onPress={() => setSearchOpen(false)} />
            </> 
            : 
            <>
            <Text style={styles.headerText}>Daniyal Afzal</Text>
            <View style={styles.availableStatus} />
            </>}
        </View>
        {!searchOpen ? <View style={styles.row}>
          <Icon name="magnify" size={32} color={Colors.grey} onPress={() => setSearchOpen(true)} />
          <Icon name="filter-variant" size={32} color={Colors.grey} />
        </View> : null}
      </View>
    );
  };

  const renderInput = () => {
    return (
      <View style={styles.inputView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Type your message...'
            value={text}
            onChangeText={(val) => setText(val)}
            onSubmitEditing={sendMessage}
          />
          <Icon name='send' style={styles.icon} onPress={sendMessage} />
        </View>
      </View>
    )
  }

  const sendMessage = () => {
    if (text !== '') {
      setMessages([{
        userId: 1,
        image: Images.person,
        text: text
      },
      ...messages])
      setText('')
    }
  }

  return (
    <RootView>
      {renderHeader()}
      <FlatList
        style={{ paddingHorizontal: Metrics.defaultMargin }}
        inverted={true}
        data={messages}
        renderItem={({ item }) => <ChatBubble item={item} />}
      />
      {renderInput()}
    </RootView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.defaultMargin,
    height: 60,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGrey,
  },
  availableStatus: {
    width: 10,
    height: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    marginLeft: 10
  },
  inputView: {
    padding: Metrics.defaultMargin,
    borderTopWidth: 2,
    borderColor: Colors.lightGrey
  },
  input: {
    height: Metrics.screenHeight * 0.05,
    paddingHorizontal: Metrics.defaultMargin,
    flex: 1
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 10,
    color: Colors.primary
  },
  inputContainer: {
    backgroundColor: colors.lightGrey,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    backgroundColor: Colors.lightGrey,
    flex: 1,
    padding: Metrics.smallMargin,
    marginHorizontal: 10,
    borderRadius: 10
  },
});
