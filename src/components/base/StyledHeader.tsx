import React from 'react';
import StyledView from './StyledView';
import StyledText from './StyledText';
import {FlatList, TextStyle, ViewStyle} from 'react-native';

export interface IHeaderProps {
  title?: string;
  titleStyle?: TextStyle;
  subTitle?: string;
  subTitleStyle?: TextStyle;
  HeaderCenterComponent?: React.ElementType;
  HeaderLefComponent?: React.ElementType;
  HeaderRightComponent?: React.ElementType;
  isBack?: boolean;
  onBack?: () => void;
  containerStyle?: ViewStyle;
}

const StyledHeader = ({title = ''}: IHeaderProps) => {
  return (
    <StyledView>
      <StyledText variant="body">Header</StyledText>
    </StyledView>
  );
};

export default StyledHeader;
