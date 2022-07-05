/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Item from '../../Components/Item';
import Button from '../../Components/Button';
import {Colors, Metrics} from '../../Theme';
import Images from '../../Utils/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';
import LottieView from 'lottie-react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import moment from 'moment'

export default class RecordAudio extends Component {
  constructor(props) {
    super(props);
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.state = {
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: null,
      currentDurationSec: null,
      playTime: null,
      duration: null,
      recording: false,
      data:[]
    };
  }

  componentDidMount() {
    // this.onStartRecord();
  }

  onStartRecord = async () => {
    var path =
      RNFS.DocumentDirectoryPath +
      '/' +
      Math.floor(Date.now()).toString() +
      '.mp3';
    console.log(path, 'PATH');
    const result = await this.audioRecorderPlayer.startRecorder(path);
    this.lottie.play();

    this.audioRecorderPlayer.addRecordBackListener(e => {
      console.log('event', e);
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        recording: true,
      });
      return;
    });
  };

  onStopRecord = async () => {
    const {data} = this.state;
    // const result = await this.audioRecorderPlayer.stopRecorder();
    // console.log('RECORD STOP', result);
    // this.audioRecorderPlayer.removeRecordBackListener();
    this.lottie.reset();
    // this.setState({
    //   recordSecs: 0,
    //   recording: false,
    // });

    this.setState({
      data:[
        ...data,{
          name:`Recording ${data.length}`,
          date:new Date()
        }
      ]
    })

    console.log(data,"DATAAA")
  };

  onResumeRecorder = async () => {
    const result = await this.audioRecorderPlayer.resumeRecorder();
    this.lottie.resume();
    console.log('RESUMED', result);
    this.setState({recording: true});
  };

  onPauseRecorder = async () => {

    const result = await this.audioRecorderPlayer.pauseRecorder();
    this.lottie.pause();
    console.log('PAUSED', result);
    this.setState({recording: false});
  };

  renderAudio = (item) => {
    const {name,date} = item;
    return (
      <View style={styles.audioItem}>
        <View style={styles.audioIconView}>
          <Icon name="play" color={Colors.primary} size={36} />
        </View>
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold', marginBottom: 5}}>{name}</Text>
          <Text>{moment(date).format("LL")} - {moment(date).format("LT")}</Text>
        </View>
      </View>
    );
  };
  render() {
    const {recording, recordTime,data} = this.state;
    console.log("STATE",this.state)
    return (
      <RootView>
        <Header
          secondary
          showContent={false}
          style={{backgroundColor: Colors.white}}
          leftIcon="chevron-left"
          onPressLeft={() => Navigator.goBack()}
        />
        <ScrollView style={{flex: 1, paddingHorizontal: Metrics.defaultMargin}}>
          <View style={[styles.item]}>
            <View style={styles.imageView}>
              <Image source={Images.soundWaves} style={styles.image} />
              <View style={styles.iconView}>
                <Icon name="check" color="white" />
              </View>
            </View>
            <View style={styles.textView}>
              <Text style={[styles.heading]}>{'Echo'}</Text>
              <Text style={[styles.text]}>
                {'Talk to me to test the audio'}
              </Text>
            </View>
          </View>
          <Button text="Add Title" style={{borderRadius: 100}} />
          <LottieView
            ref={ref => (this.lottie = ref)}
            source={require('../../../assets/images/sound-waves.json')}
            autoPlay
            speed={0.3}
            loop
            style={{width:Metrics.screenWidth*0.8, alignSelf: 'center'}}
          />
          <Button
            text="Audio"
            style={{
              width: 100,
              borderRadius: 100,
              alignSelf: 'center',
              height: 40,
              padding: 0,
              justifyContent: 'center',
            }}
          />
          <Text style={styles.time}>{recordTime}</Text>
          <View style={styles.bottomIconsView}>
            <TouchableOpacity
              onPress={this.onStopRecord}
              activeOpacity={0.8}
              style={[
                styles.audioIconView,
                {backgroundColor: Colors.lightGrey},
              ]}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={
                recording ? this.onPauseRecorder : this.onResumeRecorder
              }>
              <View style={styles.resumeView}>
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  {recording ? 'PAUSE' : 'RESUME'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onStopRecord}
              activeOpacity={0.8}
              style={[
                styles.audioIconView,
                {backgroundColor: Colors.lightGrey},
              ]}>
              <Icon name="check" size={24} />
            </TouchableOpacity>
          </View>

          {this.state.data.map(item=>
            this.renderAudio(item)
          )}
        </ScrollView>
      </RootView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.lightGrey,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.defaultMargin,
    marginBottom: Metrics.defaultMargin,
    overflow: 'hidden',
    borderRadius: 20,
  },
  imageView: {
    width: Metrics.screenWidth * 0.15,
    height: Metrics.screenWidth * 0.15,
    borderRadius: Metrics.screenWidth * 0.15,
    backgroundColor: Colors.primary,
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    tintColor: Colors.white,
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
  },
  text: {
    fontSize: 16,
  },
  audioItem: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    flexDirection: 'row',
    padding: Metrics.smallMargin,
    marginBottom: Metrics.defaultMargin,
  },
  audioIconView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeView: {
    width: 70,
    height: 70,
    backgroundColor: Colors.primary,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.defaultMargin,
  },
  bottomIconsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrics.defaultMargin,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: Metrics.defaultMargin,
    color: Colors.textDark,
  },
});
