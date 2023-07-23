import {TextProps, createText} from '@shopify/restyle';
import React from 'react';
import {TextProps as RNTextProps} from 'react-native';
import {Theme} from 'src/theme';

const Text = createText<Theme>();

interface IStyledTextProps extends TextProps<Theme>, RNTextProps {
  children?: React.ReactNode;
}

const StyledText = ({children, ...props}: IStyledTextProps) => {
  return (
    <Text variant={'default'} {...props}>
      {children}
    </Text>
  );
};

export default StyledText;
