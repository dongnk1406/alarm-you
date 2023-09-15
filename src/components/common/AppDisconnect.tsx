import NetInfo from '@react-native-community/netinfo';
import {t} from 'i18next';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {GlobalUIService} from 'src/services/globalUI';

const AppDisconnect = () => {
  const showDisconnectToast = () => {
    GlobalUIService.hideLoading();
    return Toast.show({
      type: 'error',
      text1: t('common.disconnect'),
      text2: t('common.disconnectDescription'),
    });
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        showDisconnectToast();
      }
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        showDisconnectToast();
      }
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return null;
};

export default AppDisconnect;
