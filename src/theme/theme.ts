import { createBox, createText, createTheme } from '@shopify/restyle';
import { palette } from './palette';
import { config } from './config';

export const lightTheme = createTheme({
  colors: {
    ...palette,
    mainBackground: palette.lightGray,
    mainForeground: palette.black,
    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,
  },
  fontFamily: config.fontFamily,
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
});

export type Theme = typeof lightTheme;

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    secondaryCardBackground: palette.darkGray,
    secondaryCardText: palette.white,
    primaryCardText: palette.darkGray,
  },
};

export const StyledBox = createBox<Theme>();
export const StyledText = createText<Theme>();
