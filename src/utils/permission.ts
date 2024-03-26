import {Alert, Platform} from 'react-native';
import Config from 'react-native-config';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import i18next from 'src/services/i18next';

enum EPermission {
  PHOTO = 'photo',
  CAMERA = 'camera',
  LOCATION = 'location',
  AUDIO = 'audio',
}

const isIOS = Platform.OS === 'ios';

const showPermissionGrantMessage = (type: EPermission) => {
  const title = {
    [EPermission.CAMERA]: i18next.t('permission.requestPhotoLibraryTitle', {
      permissionType: type,
    }),
    [EPermission.PHOTO]: i18next.t('permission.requestPhotoLibraryTitle'),
    [EPermission.AUDIO]: i18next.t('permission.requestPhotoLibraryTitle'),
    [EPermission.LOCATION]: i18next.t('permission.requestLocationTitle'),
  };

  const message = {
    [EPermission.CAMERA]: i18next.t('permission.requestPhotoLibraryMessage'),
    [EPermission.PHOTO]: i18next.t('permission.requestPhotoLibraryMessage'),
    [EPermission.AUDIO]: i18next.t('permission.requestPhotoLibraryMessage'),
    [EPermission.LOCATION]: i18next.t('permission.requestLocationMessage'),
  };

  Alert.alert(title[type], message[type], [
    {
      text: i18next.t('common.goToSetting'),
      onPress: () =>
        openSettings().catch(() => console.log('cannot open settings')),
    },
    {
      text: i18next.t('common.cancel'),
    },
  ]);
};

const showPermissionUnavailable = (type: EPermission) => {
  Alert.alert(i18next.t('permission.unavailable'));
};

const requestCameraPermission = async (withMsgDenied: boolean = true) => {
  const requestPermission = isIOS
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;
  try {
    const checkPermission = await check(requestPermission);
    switch (checkPermission) {
      case RESULTS.BLOCKED:
        showPermissionGrantMessage(EPermission.CAMERA);
        return false;
      case RESULTS.DENIED:
        const result = await request(requestPermission);
        if (result === RESULTS.BLOCKED) {
          showPermissionGrantMessage(EPermission.CAMERA);
        }
        return result === RESULTS.GRANTED;
      case RESULTS.UNAVAILABLE:
        showPermissionUnavailable(EPermission.CAMERA);
        return false;
      default:
        return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const requestPhotoLibraryPermission = async (withMsgDenied: boolean = true) => {
  const requestPermission = isIOS
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  try {
    const checkPermission = await check(requestPermission);
    switch (checkPermission) {
      case RESULTS.BLOCKED:
        showPermissionGrantMessage(EPermission.PHOTO);
        return false;
      case RESULTS.DENIED:
        const result = await request(requestPermission);
        if (result === RESULTS.BLOCKED) {
          showPermissionGrantMessage(EPermission.PHOTO);
        }
        return result === RESULTS.GRANTED;
      case RESULTS.UNAVAILABLE:
        showPermissionUnavailable(EPermission.PHOTO);
        return false;
      default:
        return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const requestAudioPermission = async (withMsgDenied: boolean = true) => {
  try {
    const checkPermission = await check(
      isIOS ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO,
    );
    if (checkPermission === RESULTS.BLOCKED) {
      showPermissionGrantMessage(EPermission.AUDIO);
      return false;
    }
    if (checkPermission === RESULTS.DENIED) {
      const result = await request(
        isIOS ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      return result === RESULTS.GRANTED;
    }
    if (checkPermission === RESULTS.UNAVAILABLE) {
      showPermissionUnavailable(EPermission.AUDIO);
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const requestLocationPermission = async (withMsgDenied: boolean = true) => {
  try {
    const checkPermission = await check(
      isIOS
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (checkPermission === RESULTS.BLOCKED) {
      showPermissionGrantMessage(EPermission.LOCATION);
      return false;
    }
    if (checkPermission === RESULTS.DENIED) {
      const result = await request(
        isIOS
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (result === RESULTS.BLOCKED) {
        showPermissionGrantMessage(EPermission.LOCATION);
      }
      return result === RESULTS.GRANTED;
    }
    if (checkPermission === RESULTS.UNAVAILABLE) {
      showPermissionUnavailable(EPermission.LOCATION);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

export {
  requestPhotoLibraryPermission,
  requestCameraPermission,
  requestAudioPermission,
  requestLocationPermission,
};
