import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import Modal from 'react-native-modal';

import {styles} from './styles';
import BottomSheetHeader from '../BottomSheetHeader/BottomSheetHeader';
import Spinner from 'react-native-loading-spinner-overlay';
import {CustomerLoader} from '../RootView/index';
import {isAndroid} from '../../Constants';
import colors from "../../Theme/Colors";

const BottomSheet = ({
  backPressIcon,
  backIconStyle,
  visible,
  onBackPress,
  title,
  children,
  animationInTiming,
  animationOutTiming,
  animationIn,
  animationOut,
  renderCustomHeader,
  headerContainerStyle,
  headerTitleStyle,
  modalStyle,
  avoidKeyboard = false,
  hasBackdrop = true,
  statusBarTranslucent = true,
  backdropColor,
  onModalWillShow,
  closeOnBackdrop = true,
  onModalHide = () => {},
  onModalShow = () => {},
  isLoading = false,
  headerRightView,
  containerStyle,
}) => {
  const [isModalDisplayed, setIsModalDisplayed] = useState(true);
  const ParentComponent =
    isAndroid && avoidKeyboard ? KeyboardAvoidingView : View;

  const onModalUp = () => {
    setIsModalDisplayed(true);
    if (typeof onModalHide === 'function') {
      onModalHide();
    }
  };
  const onModalDown = () => {
    setIsModalDisplayed(false);
    if (typeof onModalHide === 'function') {
      onModalHide();
    }
  };

  const renderHeader = () => {
    if (typeof renderCustomHeader === 'function') {
      return renderCustomHeader();
    }
    return (
      <BottomSheetHeader
        backPressIcon={backPressIcon}
        title={title}
        backIconStyle={backIconStyle}
        style={headerContainerStyle}
        titleStyle={headerTitleStyle}
        onBackPress={onBackPress}
        rightView={headerRightView}
      />
    );
  };

  return (
    // <GestureRecognizer onSwipeDown={onBackPress}>
    <Modal
      testID={'modal'}
      useNativeDriver={false}
      isVisible={visible}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={false}
      // swipeDirection={['down']}
      avoidKeyboard={avoidKeyboard}
      hasBackdrop={hasBackdrop}
      animationIn={animationIn}
      animationOut={animationOut}
      onModalWillShow={onModalWillShow}
      animationInTiming={animationInTiming || 300}
      animationOutTiming={animationOutTiming || 300}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={0}
      onBackdropPress={closeOnBackdrop ? onBackPress : () => {}}
      onRequestClose={onBackPress}
      // onModalShow={onModalUp}
      // onModalHide={onModalDown}
      // onSwipeMove={percentage => {
      //   if (percentage * 100 < 60) {
      //     onModalHide();
      //   }
      // }}
      backdropColor={backdropColor}
      statusBarTranslucent={statusBarTranslucent}
      style={[styles.view, modalStyle]}>
      <ParentComponent
        style={[styles.container, containerStyle]}
        behavior="padding"
        enabled>
        <View style={styles.bar} />
        {renderHeader()}
        {children}
      </ParentComponent>
      {isModalDisplayed && (
        <Spinner
          visible={isLoading}
          customIndicator={<CustomerLoader />}
          color={colors.primaryBlue}
        />
      )}
    </Modal>
    // </GestureRecognizer>
  );
};

export default BottomSheet;
