// https://stackoverflow.com/questions/63861907/react-native-add-fade-in-animation
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Keyboard, Modal, StyleSheet} from 'react-native';
import {s} from 'react-native-size-matters';
import {config, palette} from 'src/theme';
import {StyledText, StyledView} from '../base';
import AppActivityIndicator from './AppActivityIndicator';

const AppLoading = ({}, ref: any) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const countTimerRef = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timer>();

  useImperativeHandle(ref, () => ({
    showLoading: () => {
      setLoading(true);
      Keyboard.dismiss();
    },
    hideLoading: () => {
      setLoading(false);
      countTimerRef.current = 0;
    },
  }));

  useEffect(() => {
    // auto hide loading after > 15s once no response hide loading
    if (isLoading) {
      timerIntervalRef.current = setInterval(() => {
        countTimerRef.current++;
        if (countTimerRef.current >= 15) {
          setLoading(false);
          // You can show toast for error message
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerIntervalRef.current);
      countTimerRef.current = 0;
    };
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <StyledView style={styles.container}>
      <StyledView style={[styles.background]}>
        <AppActivityIndicator color={palette.black} size={'small'} />
        <StyledText color={'black'} marginTop={'s'}>
          Loading...
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  background: {
    height: s(70),
    width: s(70),
    borderRadius: s(4),
    backgroundColor: config.extraColors.whiteOpacity(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Consider using global UI, it can block the main thread => crash the app
export default forwardRef(AppLoading);
