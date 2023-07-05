import React from 'react';
import StyledView from './StyledView';
import StyledText from './StyledText';
import {TextStyle} from 'react-native';

export interface IHeaderProps {
  title?: string;
  titleStyle?: TextStyle;
  renderHeaderCenter?: () => React.ReactNode;
  renderHeaderLeft?: () => React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  isBack?: boolean;
}

const StyledHeader = ({title = ''}: IHeaderProps) => {
  return (
    <StyledView>
      <StyledText variant="body">Header</StyledText>
    </StyledView>
  );
};

export default StyledHeader;
