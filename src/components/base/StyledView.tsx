import {createBox} from '@shopify/restyle';
import {ViewProps} from 'react-native';
import {Theme} from 'src/theme';

const StyledView = createBox<Theme, ViewProps>();

export default StyledView;
