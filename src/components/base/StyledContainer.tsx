import React from 'react';
import {StyleSheet} from 'react-native';
import StyledView from './StyledView';

interface Props {
  /**
   * Used to show or hide header. If withHeader = true, children should not wrap by SafeAreaView
   */
  children: React.ReactNode;
  renderHeader?: () => React.ReactNode;
  withSafeArea: boolean;
}

const StyledContainer = ({renderHeader, children}: Props) => {
  return (
    <StyledView style={styles.container}>
      {renderHeader && renderHeader()}
      {children}
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StyledContainer;
