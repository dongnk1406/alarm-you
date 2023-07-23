import {Dimensions} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {s} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const Metrics = {
  screenHeight: width < height ? height : width,
  screenWidth: width < height ? width : height,
  bottomInset: initialWindowMetrics?.insets?.bottom || 0,
  topInset: initialWindowMetrics?.insets?.top || 0,
  paddingHorizontal: s(16),
};

export default Metrics;
