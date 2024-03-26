import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, AppState, StyleSheet} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {StyledView} from 'src/components/base';
import {requestCameraPermission} from 'src/utils/permission';

export const CameraScreen: React.FC<any> = () => {
  const device = useCameraDevice('back');
  const [cameraPermission, setCameraPermission] =
    React.useState<boolean>(false);
  const isFocused = useIsFocused();
  const isActiveCamera = isFocused && AppState.currentState === 'active';

  const requestPermission = async () => {
    const permission = await requestCameraPermission();
    setCameraPermission(permission);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   if (frame.pixelFormat === 'rgb') {
  //     const buffer = frame.toArrayBuffer();
  //     const data = new Uint8Array(buffer);
  //     console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`);
  //   }
  // }, []);

  if (!device || !cameraPermission) {
    return (
      <StyledView flex={1} justifyContent={'center'} alignItems={'center'}>
        <ActivityIndicator />
      </StyledView>
    );
  }

  return (
    <StyledView flex={1} backgroundColor={'primary-1'}>
      <Camera
        style={[StyleSheet.absoluteFill, styles.camera]}
        device={device}
        isActive={isActiveCamera}
        // frameProcessor={frameProcessor}
      />
    </StyledView>
  );
};

const styles = StyleSheet.create({
  camera: {
    zIndex: -10,
  },
});
