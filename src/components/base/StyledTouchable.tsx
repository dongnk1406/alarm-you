import {throttle} from 'lodash';
import React, {memo, useMemo} from 'react';
import {
  ColorValue,
  GestureResponderEvent,
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

interface StyledTouchableProps extends TouchableOpacityProps {
  /**
   * @props Wait The number of milliseconds to throttle invocations to.
   * Defaults to 300ms
   */
  throttleTime?: number;

  /**
   * @props Determines what the scale of the wrapped view should be when touch is active.
   * Defaults to 1
   */
  activeScale?: number;

  /**
   * @props Underlay color when the touch is start
   */
  underlayColor?: ColorValue;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const StyledTouchable = ({
  children,
  throttleTime = 300,
  activeScale = 1,
  underlayColor,
  style,
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  ...props
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
    const backgroundColor: ColorValue = underlayColor
      ? underlayColor
      : style?.backgroundColor || 'transparent';

    return {
      backgroundColor: underlayColorAnimated.value
        ? backgroundColor
        : style?.backgroundColor || 'transparent',
    };
  });

  const handlePress = throttle(onPress, throttleTime, {trailing: false});

  const handlePressIn = (event: GestureResponderEvent) => {
    scaleAnimated.value = withTiming(1, {duration: 250});
    underlayColorAnimated.value = 1;
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    scaleAnimated.value = withTiming(0, {duration: 250});
    underlayColorAnimated.value = 0;
    onPressOut?.(event);
  };

  const _style = useMemo(() => {
    let styles = [style];
    styles = styles.concat(underlayColorAnimatedStyle);

    if (activeScale !== 1) {
      styles = styles.concat(scaleAnimatedStyle);
    }

    return styles;
  }, [activeScale, scaleAnimatedStyle, style, underlayColorAnimatedStyle]);

  return (
    <AnimatedTouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={_style}
      {...props}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

/**
 * StyledTouchable wrapper for touchable children
 * @param props
 * @returns
 */
export default memo(StyledTouchable);
