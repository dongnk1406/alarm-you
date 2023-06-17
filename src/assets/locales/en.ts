import Config from 'react-native-config';

const APP_NAME = Config.APP_NAME || 'My Alarm';

const en = {
  common: {
    defaultLanguage: 'English',
    close: 'Close',
    noData: 'No data',
    cancel: 'Cancel',
    confirm: 'Confirm',
    complete: 'Complete',
    map: 'Map',
    back: 'Back',
    disconnect: 'Disconnect',
    disconnectDescription: 'You lót the internet connection',
    goToSetting: 'Go to Setting',
  },
  permission: {
    requestPhotoLibraryTitle:
      APP_NAME + ' would like to access your PhotoLibrary',
    requestPhotoLibraryMessage: 'We upload image',
    requestLocationTitle: APP_NAME + ' would like to access your Location',
    requestLocationMessage: 'We require location',
    unavailable: APP_NAME + " can't connect to function",
  },
};

export type TTranslations = typeof en;

export default en;
