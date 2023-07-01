import {Dimensions, Platform} from 'react-native';
import {vs} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/*
 window: reports width/height without the soft menu bar
screen: reports entire screen's width/height
*/
const {width, height} = Dimensions.get('window');

const _Metrics = () => {
  const insets = useSafeAreaInsets();
  return {
    screenHeight: width < height ? height : width,
    screenWidth: width < height ? width : height,
    bottomPadding:
      insets.bottom > 30 && Platform.OS === 'ios' ? insets.bottom : vs(20),
    topPadding: insets.top > 30 ? insets.top : vs(20),
  };
};

const Metrics = _Metrics();

export default Metrics;
