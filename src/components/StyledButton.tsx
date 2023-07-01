import React from 'react';
import {
  AllProps,
  all,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';
import {
  TouchableHighlightProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Theme} from 'src/theme';

type RestyleProps = AllProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([all]);

type Props = RestyleProps &
  TouchableOpacityProps &
  TouchableHighlightProps &
  Partial<{}>;

export const StyledButton = ({children, ...rest}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
};
