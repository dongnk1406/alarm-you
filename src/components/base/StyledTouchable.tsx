import {createBox} from '@shopify/restyle';
import {throttle} from 'lodash';
import React, {FunctionComponent, memo, useMemo} from 'react';
import {
  ColorValue,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Theme} from 'src/theme';

interface StyledTouchableProps extends TouchableOpacityProps {
  /**
   * @props Wait The number of milliseconds to throttle invocations to.
   * Defaults to 500ms
   */
  throttleTime?: number;

  /**
   * @props Determines what the scale of the wrapped view should be when touch is active.
   * Defaults to 1
   */
  activeScale?: number;

  /**
   * @props Determines what the opacity of the wrapped view should be when touch is active.
   * Defaults to 1
   */
  activeOpacity?: number;

  /**
   * @props Underlay color when the touch is start
   * Defaults to 'transparent'
   */
  activeUnderlayColor?: ColorValue;
}

const BaseTouchable = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

const StyledTouchable: FunctionComponent<StyledTouchableProps> = ({
  children,
  throttleTime = 500,
  onPress = () => {},
  activeScale = 1,
  activeOpacity = 1,
  activeUnderlayColor = 'transparent',
  style,
}: StyledTouchableProps) => {
  const scaleAnimated = useSharedValue(0);
  const underlayColorAnimated = useSharedValue(0);

  // scale animation
  const scaleInterpolate = useDerivedValue(() => {
    return interpolate(scaleAnimated.value, [0, 1], [1, activeScale]);
  });

  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleInterpolate.value}],
    };
  });

  // underlay color animation
  const underlayColorAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: underlayColorAnimated.value
        ? activeUnderlayColor
        : 'transparent',
    };
  });

  const handlePress = throttle(onPress, throttleTime, {trailing: false});
  const handlePressIn = () => {
    scaleAnimated.value = withTiming(1, {duration: 250});
    underlayColorAnimated.value = 1;
  };
  const handlePressOut = () => {
    scaleAnimated.value = withTiming(0, {duration: 250});
    underlayColorAnimated.value = 0;
  };

  const _style = useMemo(() => {
    let styles = [style];
    if (activeScale !== 1) {
      styles = styles.concat(scaleAnimatedStyle);
    }
    if (activeUnderlayColor !== 'transparent') {
      styles = styles.concat(underlayColorAnimatedStyle);
    }

    return styles;
  }, [
    activeScale,
    activeUnderlayColor,
    scaleAnimatedStyle,
    style,
    underlayColorAnimatedStyle,
  ]);

  return (
    <BaseTouchable
      activeOpacity={activeOpacity}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={_style}>{children}</Animated.View>
    </BaseTouchable>
  );
};

/**
 * StyledTouchable wrapper for touchable children
 * @param props
 * @returns
 */
export default memo(StyledTouchable);
