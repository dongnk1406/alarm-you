import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StyledView} from './StyledView';
import {StyledHeader} from './StyledHeader';

interface Props {
  /**
   * Used to show or hide header. If withHeader = true, children should not wrap by SafeAreaView
   */
  withHeader?: boolean;
  children: React.ReactNode;
}

export const StyledContainer = ({withHeader = true, children}: Props) => {
  return (
    <StyledView style={styles.container}>
      {withHeader && <StyledHeader />}
      {children}
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
