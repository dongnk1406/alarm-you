import {s} from 'react-native-size-matters';

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
    xs: s(4),
    s: s(8),
    m: s(12),
    l: s(16),
    xl: s(20),
    '2xl': s(24),
    '3xl': s(28),
    '4xl': s(32),
    '5xl': s(36),
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
