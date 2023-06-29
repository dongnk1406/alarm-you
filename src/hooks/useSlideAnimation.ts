import {useEffect} from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Metrics from 'src/assets/metrics';

const useSlideAnimation = () => {
  const transXRight = useSharedValue(0);

  const styles = useAnimatedStyle(() => {
    return {
      left: Metrics.screenWidth,
      transform: [
        {
          translateX: transXRight.value,
        },
      ],
    };
  });

  useEffect(() => {
    transXRight.value = withTiming(-Metrics.screenWidth, {
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

  return styles;
};

export default useSlideAnimation;
