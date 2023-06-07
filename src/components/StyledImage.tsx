import React, {ReactElement, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

interface IProps extends FastImageProps {
  renderSkeletonLoading?: () => React.ReactElement;
}

export const StyledImage = ({renderSkeletonLoading, ...props}: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onLoadStart = () => {
    console.log('start');
    // setLoading(true);
  };
  const onLoadEnd = () => {
    console.log('end');
    // setLoading(false);
  };

  if (loading) {
    if (renderSkeletonLoading) {
      return renderSkeletonLoading();
    }
    return <ActivityIndicator size="small" />;
  }

  return (
    <FastImage onLoadStart={onLoadStart} onLoadEnd={onLoadEnd} {...props} />
  );
};
