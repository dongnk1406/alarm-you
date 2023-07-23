import {createTheme} from '@shopify/restyle';
import {config} from './config';
import {palette} from './palette';

export const shadow = {
  low: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  high: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  extraHigh: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  ultraHigh: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
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
