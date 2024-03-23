import React, {useState} from 'react';
import {View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

interface IProps extends FastImageProps {
  renderSkeletonLoading?: () => React.ReactElement;
  zoomable?: boolean;
}

// use AppFastImage for local image
const AppFastImage = ({
  renderSkeletonLoading,
  source,
  style,
  ...props
}: IProps) => {
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

      <FastImage
        {...props}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={style}
        source={error ? undefined : source}
      />
    </View>
  );
};

export default AppFastImage;
