import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {t} from 'i18next';
import Toast from 'react-native-toast-message';

const StyledDisconnect = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);

  const showDisconnectToast = () => {
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

  return <></>;
};

export default StyledDisconnect;
