import React from 'react';

import {ActivityIndicator, StyleSheet, View, ViewProps} from 'react-native';
import {LightTheme} from 'src/theme';

export interface ILoading extends ViewProps {
  isLoading: boolean;
  color?: string;
  mini?: boolean;
  borderRadius?: number;
}

export const AppLoading: React.FC<ILoading> = React.memo(props => {
  let {
    isLoading,
    color = LightTheme.colors['primary-1'],
    mini = false,
    style,
  } = props;
  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <View
          style={[
            styles.background,
            mini ? {backgroundColor: 'transparent'} : {},
          ]}>
          <ActivityIndicator color={mini ? '#fff' : color} />
        </View>
      </View>
    );
  } else {
    return null;
  }
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LightTheme.blackOpacity(0.5),
    zIndex: 99,
    borderRadius: 8,
  },
  background: {
    height: 60,
    width: 60,
    borderRadius: 3,
    backgroundColor: 'rgba(214, 214, 229, 0.87)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
});
