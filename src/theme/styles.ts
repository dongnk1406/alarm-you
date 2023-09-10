import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  paddingTopNone: {
    paddingTop: 0,
  },
  paddingBottomNone: {
    paddingBottom: 0,
  },
  paddingHorizontalNone: {
    paddingHorizontal: 0,
  },
  paddingVerticalNone: {
    paddingVertical: 0,
  },
});
