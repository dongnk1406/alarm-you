import React, {useState} from 'react';
import {StyleProp, View} from 'react-native';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';

interface IProps extends FastImageProps {
  renderSkeletonLoading?: () => React.ReactElement;
  style?: StyleProp<ImageStyle>;
}

const StyledImage = ({renderSkeletonLoading, style, ...props}: IProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const renderImageLoading = () => {
    return (
      <View style={style}>
        {renderSkeletonLoading ? (
          renderSkeletonLoading()
        ) : (
          <View style={[{backgroundColor: '#ccc', flex: 1}]} />
        )}
      </View>
    );
  };

  const onLoaded = () => {
    setLoaded(true);
  };

  return (
    <View style={style}>
      {!loaded && renderImageLoading()}
      <FastImage onLoad={onLoaded} style={style} {...props} />
    </View>
  );
};

export default StyledImage;
