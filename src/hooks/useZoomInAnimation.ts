import {useEffect} from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useZoomInAnimation = () => {
  const scaleValue = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  const scaleStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: scaleValue.value,
        },
      ],
    };
  });

  useEffect(() => {
    scaleValue.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    });
    opacity.value = withTiming(1, {
      duration: 500,
    });
  }, [opacity, scaleValue]);

  return scaleStyle;
};

export default useZoomInAnimation;
