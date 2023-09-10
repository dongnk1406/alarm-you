import {s} from 'react-native-size-matters';
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
};
