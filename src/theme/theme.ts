import {createTheme} from '@shopify/restyle';
import _ from 'lodash';
import {config} from './config';
import {palette} from './palette';

export const shadow = {
  noShadow: {
    shadowColor: 'transparent',
  },
  low: {
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.34,
    shadowRadius: 3,
    elevation: 4,
  },
  high: {
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.43,
    shadowRadius: 5,
    elevation: 6,
  },
  extraHigh: {
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.51,
    shadowRadius: 7,
    elevation: 12,
  },
  ultraHigh: {
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10,
    elevation: 16,
  },
};

export const LightTheme = createTheme({
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
  colors: {
    ...palette,
    mainBackground: palette.lightGray,
    mainForeground: palette.black,
    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,
    transparent: 'transparent',
  },
  fontFamily: config.fonts,
  spacing: config.spacings,
  textVariants: config.textVariants,
  cardVariants: {
    defaults: {},
    primary: {
      backgroundColor: 'primaryCardBackground',
      shadowOpacity: 0.3,
    },
    secondary: {
      backgroundColor: 'secondaryCardBackground',
      shadowOpacity: 0.1,
    },
  },
  shadow: shadow,
  whiteOpacity: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
  blackOpacity: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
  greenOpacity: (opacity: number) => `rgba(0, 255, 193, ${opacity})`,
});

export type Theme = typeof LightTheme;

export const DarkTheme: Theme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    mainBackground: palette['neutral-black'],
    mainForeground: palette.white,
    secondaryCardBackground: palette.darkGray,
    secondaryCardText: palette.white,
    primaryCardText: palette.darkGray,
  },
};

export const AppTheme = _.cloneDeep(LightTheme);
