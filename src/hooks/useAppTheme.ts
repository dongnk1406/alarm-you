import {useTheme} from '@shopify/restyle';
import {Theme} from 'src/theme';

const useAppTheme = () => useTheme<Theme>();

export default useAppTheme;
