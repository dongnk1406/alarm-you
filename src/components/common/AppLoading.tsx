import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Keyboard,
  Modal,
  StyleSheet,
  ViewProps,
} from 'react-native';
import {config, palette} from 'src/theme';
import {StyledText, StyledView} from '../base';
export interface ILoading extends ViewProps {
  color?: string;
  mini?: boolean;
}

const AppLoading = ({color = palette.purpleDark, mini}: ILoading, ref: any) => {
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
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerIntervalRef.current);
      countTimerRef.current = 0;
    };
  }, [isLoading]);

  return (
    <Modal animationType="fade" visible={isLoading} transparent>
      <StyledView style={styles.container}>
        <StyledView
          style={[styles.background]}
          backgroundColor={mini ? 'transparent' : undefined}>
          <ActivityIndicator color={mini ? 'transparent' : color} />
          <StyledText>Loading</StyledText>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.extraColors.blackOpacity(0.7),
    flex: 1,
  },
  background: {
    height: 60,
    width: 60,
    borderRadius: 3,
    backgroundColor: config.extraColors.whiteOpacity(0.8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default forwardRef(AppLoading);
