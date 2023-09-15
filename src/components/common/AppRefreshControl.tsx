import React from 'react';
import {RefreshControl, RefreshControlProps} from 'react-native';

interface Props extends RefreshControlProps {}

export const AppRefreshControl = ({tintColor, ...props}: Props) => {
  return <RefreshControl tintColor={tintColor || 'black'} {...props} />;
};
