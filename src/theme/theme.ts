import {createTheme} from '@shopify/restyle';
import {config} from './config';
import {palette} from './palette';

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
  shadow: config.shadows,
  extraColors: config.extraColors,
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
