import React from 'react';
import Toast from 'react-native-toast-message';

const globalLoadingRef = React.createRef<any>();

function showLoading() {
  globalLoadingRef.current?.showLoading();
}

function hideLoading() {
  globalLoadingRef.current?.hideLoading();
}

function showToastSuccess() {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: 'Success',
  });
}
function showToastError() {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'Error',
  });
}

export const GlobalUIService = {
  globalLoadingRef,
  showLoading,
  hideLoading,
  showToastSuccess,
  showToastError,
};
