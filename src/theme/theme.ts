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
  colors: {
    ...palette,
    mainBackground: palette.lightGray,
    mainForeground: palette.black,
    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,
  },
  fonts: {
    font900: 'Roboto-Black',
    font900Italic: 'Roboto-BlackItalic',
    font700: 'Roboto-Bold',
    font700Italic: 'Roboto-BoldItalic',
    font500: 'Roboto-Medium',
    font500Italic: 'Roboto-MediumItalic',
    font400: 'Roboto-Regular',
    font400Italic: 'Roboto-Regular',
    font300: 'Roboto-Light',
    font300Italic: 'Roboto-LightItalic',
  },
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
});

export type Theme = typeof LightTheme;

export const DarkTheme: Theme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    secondaryCardBackground: palette.darkGray,
    secondaryCardText: palette.white,
    primaryCardText: palette.darkGray,
  },
};
