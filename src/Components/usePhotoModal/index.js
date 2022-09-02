import React, {useMemo, useState} from 'react';
import {Text, StyleSheet, View, Alert, Linking, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from "../../Theme/Colors";
import Metrics from "../../Theme/Metrics";
import {API_STATUS, APP_STRINGS} from '../../Constants';
import ImagePicker from 'react-native-image-crop-picker';
import {REQUEST_METHOD, useApiWrapper} from '../../CustomHooks/useApiWrapper';
import ApiService from '../../Services/ApiService';


export const delay = (ms = 300) =>
    new Promise(resolve => setTimeout(resolve, ms));

const ModalButton = ({text, onPress, color, textStyle, divider = true}) => {
  return (
    <>
      {!!divider && <View style={styles.divider} />}
      <TouchableOpacity activeOpacity={0.9} style={styles.modalButton} onPress={onPress}>
        <View>
          <Text style={[styles.buttonTextStyle, textStyle, {color}]}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const usePhotoModal = ({
  isVisible,
  closeModal,
  image,
  onSetPhoto,
  onSetBaseUrl,
  onRemovePhoto,
  withRemoveOption = true,
  options,
  modalHeading,
  containerName = '',
  onUpdateImages,
  imagesState = [],
  activeIndex,
}) => {
  const blobBaseUrl='http://bff.appnoit.com/uploads/';
  const {
    onCallApi: onCallUploadApi,
    loading: isUploadingPhoto,
    renderErrorModalJSX: renderUploadError,
    generateQueryParams,
  } = useApiWrapper({
    type: REQUEST_METHOD.POST,
    baseUrl: ApiService.uploadImages,
    endPoint: '?',
  });

  options = options?.multiple ? {...options, maxFiles: maxImageLimit} : options;

  // const {onCallApi: onCallDeletePhotoApi} = useApiWrapper({
  //   endPoint: ApiService.users.deleteProfilePicture,
  //   type: REQUEST_METHOD.DELETE,
  //   withError: false,
  // });

  const getFileName = filename => {
    const split = filename.split('.');
    let nameBeforeExtension;
    const randomNumber = Math.floor(Math.random() * 11);

    const timeStampAddition = `_${Date.now()}`;
    if (split.length > 1) {
      nameBeforeExtension = split[split.length - 2];
      nameBeforeExtension = `${nameBeforeExtension}${randomNumber}`;
      nameBeforeExtension = nameBeforeExtension + timeStampAddition;
    } else {
      nameBeforeExtension = split[split.length - 1];
      nameBeforeExtension = `${nameBeforeExtension}${randomNumber}`;
      nameBeforeExtension = nameBeforeExtension + timeStampAddition;
    }
    return nameBeforeExtension+".jpg";
  };

  const selectPhoto = async typeFunc => {
    try {
      closeModal(false);
      await delay(700);
      const photo = await typeFunc({
        cropping: true,
        mediaType: 'photo',
        cropperCircleOverlay: true,
        includeBase64: true,
        ...(options || {}),
      });
      photo.data = `data:${photo?.mime};base64,${photo?.data}`;
      onSetPhoto?.(getPhotoData(photo));
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        return false;
      }
      if (
        ['E_NO_LIBRARY_PERMISSION', 'E_NO_CAMERA_PERMISSION'].includes(
          error?.code,
        )
      ) {
        Alert.alert(
          APP_STRINGS.PERMISSIONS_ERROR,
          APP_STRINGS.PERMISSIONS_ERROR_MESSAGE,
          [
            {
              text: APP_STRINGS.CANCEL,
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: APP_STRINGS.OPEN_SETTINGS, onPress: Linking.openSettings},
          ],
        );
      }
    }
  };

  const getPhotoData=(photo)=>{
    const {path, mime, filename: name} = photo || {};
    const filename = name || 'photo.JPG';
    const timeStampName = getFileName(filename);
    photo = {
      ...photo,
      uri: path,
      type: mime,
      // forceJpg: true,
      compressImageQuality: 0.9,
      name: timeStampName,
    };
    return photo
  }
  const uploadFromLibrary = async () => {
    await selectPhoto(ImagePicker.openPicker);
  };

  const uploadFromCamera = async () => {
    await selectPhoto(ImagePicker.openCamera);
  };

  const removeImage = async index => {

      onSetPhoto('');
      onSetBaseUrl('');
      if (typeof onRemovePhoto === 'function') {
        onRemovePhoto();
      }
      closeModal()
  };


  const renderModalContent = () => (
    <>
      <View style={[styles.modalContent, {backgroundColor: '#d3d3d3'}]}>
        <Text style={styles.editProfile}>{modalHeading}</Text>
        <ModalButton
          text={APP_STRINGS.UPLOAD_FROM_LIBRARY}
          onPress={uploadFromLibrary}
          color={colors.primary}
        />
        <ModalButton
          text={APP_STRINGS.OPEN_CAMERA}
          onPress={() => uploadFromCamera(false)}
          color={colors.black}
          // textStyle={{}}
        />
        {!!image && withRemoveOption && (
          <>
            <ModalButton
              text={APP_STRINGS.REMOVE_IMAGE}
              onPress={() => removeImage(activeIndex)}
              color={colors.red}
            />
          </>
        )}
      </View>

      <TouchableOpacity activeOpacity={0.9} onPress={() => closeModal(false)}>
        <View style={[styles.modalContent, styles.cancelWrapper]}>
          <ModalButton
            text={APP_STRINGS.CANCEL}
            color={colors.primary}
            onPress={() => closeModal(false)}
            // textStyle={{fontFamily: fonts.semiBold}}
            divider={false}
          />
        </View>
      </TouchableOpacity>
    </>
  );

  const renderPhotoModalJSX = () => {
    return (
      <Modal
        isVisible={isVisible}
        statusBarTranslucent
        useNativeDriverForBackdrop={true}
        useNativeDriver={true}
        deviceHeight={Metrics.screenHeight * 2}
        style={styles.bottomModal}>
        {renderModalContent()}
      </Modal>
    );
  };

  return {
    isUploadingPhoto,
    renderUploadError,
    renderPhotoModalJSX,
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    width: '100%',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: colors.black_10,
  },
  modalContent: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    borderColor: colors.black_10,
  },
  cancelWrapper: {
    backgroundColor: colors.white,
    marginVertical: 10,
  },
  editProfile: {
    padding: 12,
    fontSize: 14,
    color: colors.darkGrey,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 10,
    marginBottom: 30,
  },
  buttonTextStyle: {
    fontSize: 20,
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
  },
});

export default usePhotoModal;
