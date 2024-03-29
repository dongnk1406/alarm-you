import {palette} from './palette';
import {FontSizes} from './sizes';

export const config = {
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
  spacings: {
    xs: FontSizes.FONT_4,
    s: FontSizes.FONT_8,
    m: FontSizes.FONT_12,
    l: FontSizes.FONT_16,
    xl: FontSizes.FONT_20,
    '2xl': FontSizes.FONT_24,
    '3xl': FontSizes.FONT_28,
    '4xl': FontSizes.FONT_32,
    '5xl': FontSizes.FONT_36,
  },
  textVariants: {
    default: {},
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    'text-xs': {
      fontSize: 12,
    },
    'text-sm': {},
    'text-base': {},
    'text-lg': {},
    'text-xl': {},
    'text-2xl': {},
    'text-3xl': {},
    'text-4xl': {},
    'text-5xl': {},
  },
  shadows: {
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
  },
  extraColors: {
    // Color with opacity
    whiteOpacity: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
    blackOpacity: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
    greenOpacity: (opacity: number) => `rgba(0, 255, 193, ${opacity})`,
  },
};
