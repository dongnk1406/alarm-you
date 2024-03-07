import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

function AppActivityIndicator({...props}: ActivityIndicatorProps) {
  return <ActivityIndicator {...props} />;
}

export default AppActivityIndicator;
