import React from 'react';
import Toast from 'react-native-toast-message';

export type TGlobalLoadingRef = {
  showLoading: () => void;
  hideLoading: () => void;
};

const globalLoadingRef = React.createRef<any>();

function showLoading() {
  globalLoadingRef.current?.showLoading();
}

function hideLoading() {
  globalLoadingRef.current?.hideLoading();
}

function showToastSuccess(message: string | Array<string>) {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: 'Success',
  });
}
function showToastError(message: string | Array<string>) {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'Error',
  });
}

function formatResponseMessage() {}

export const GlobalUIService = {
  globalLoadingRef,
  showLoading,
  hideLoading,
  showToastSuccess,
  showToastError,
};
