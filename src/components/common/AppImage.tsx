import React, {useState} from 'react';
import {View, Image, ImageProps} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

interface IProps extends ImageProps {
  renderSkeletonLoading?: () => React.ReactElement;
  zoomable?: boolean;
}

// use image for local image
const AppImage = ({renderSkeletonLoading, source, style, ...props}: IProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const renderImageLoading = () => {
    return (
      <View style={style}>
        {renderSkeletonLoading ? (
          renderSkeletonLoading()
        ) : (
          <View style={[{backgroundColor: '#ccc', flex: 1}, style]} />
        )}
      </View>
    );
  };

  return (
    <View style={style}>
      {!loaded && renderImageLoading()}

      <Image
        {...props}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={style}
        source={error ? undefined : source}
      />
    </View>
  );
};

export default AppImage;
