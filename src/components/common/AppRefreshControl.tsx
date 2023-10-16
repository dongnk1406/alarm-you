import React from 'react';
import {RefreshControl, RefreshControlProps} from 'react-native';

type Props = RefreshControlProps;

export const AppRefreshControl = ({tintColor, ...props}: Props) => {
  return <RefreshControl tintColor={tintColor || 'black'} {...props} />;
};
