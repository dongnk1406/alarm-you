import {Alert, Platform} from 'react-native';
import Config from 'react-native-config';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import i18next from 'src/utils/i18next';

enum EPermission {
  PHOTO = 'photo',
  CAMERA = 'camera',
  LOCATION = 'location',
  AUDIO = 'audio',
}

const isIOS = Platform.OS === 'ios';

const requestCamera = async () => {
  const requestPermission = isIOS
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;
  try {
    const checkPermission = await check(requestPermission);
    switch (checkPermission) {
      case RESULTS.BLOCKED:
        showPermissionMessage(EPermission.CAMERA);
        return false;
      case RESULTS.DENIED:
        const result = await request(requestPermission);
        if (result === RESULTS.BLOCKED) {
          showPermissionMessage(EPermission.CAMERA);
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

const requestPhotoLibrary = async () => {
  const requestPermission = isIOS
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  try {
    const checkPermission = await check(requestPermission);
    switch (checkPermission) {
      case RESULTS.BLOCKED:
        showPermissionMessage(EPermission.PHOTO);
        return false;
      case RESULTS.DENIED:
        const result = await request(requestPermission);
        if (result === RESULTS.BLOCKED) {
          showPermissionMessage(EPermission.PHOTO);
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

const requestAudio = async () => {
  try {
    const checkPermission = await check(
      isIOS ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO,
    );
    if (checkPermission === RESULTS.BLOCKED) {
      showPermissionMessage(EPermission.AUDIO);
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

const requestLocation = async () => {
  try {
    const checkPermission = await check(
      isIOS
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (checkPermission === RESULTS.BLOCKED) {
      showPermissionMessage(EPermission.LOCATION);
      return false;
    }
    if (checkPermission === RESULTS.DENIED) {
      const result = await request(
        isIOS
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (result === RESULTS.BLOCKED) {
        showPermissionMessage(EPermission.LOCATION);
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

const showPermissionMessage = (type: EPermission) => {
  const title = {
    camera: i18next.t('permission.requestPhotoLibraryTitle', {
      permissionType: type,
    }),
    photo: i18next.t('permission.requestPhotoLibraryTitle'),
    audio: i18next.t('permission.requestPhotoLibraryTitle'),
    location: i18next.t('permission.requestLocationTitle'),
  };

  const message = {
    camera: i18next.t('permission.requestPhotoLibraryMessage'),
    photo: i18next.t('permission.requestPhotoLibraryMessage'),
    audio: i18next.t('permission.requestPhotoLibraryMessage'),
    location: i18next.t('permission.requestLocationMessage'),
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

export default {
  requestPhotoLibrary,
  requestCamera,
  requestAudio,
  requestLocation,
};
