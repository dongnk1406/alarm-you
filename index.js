/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import App from './src/App';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
if (__DEV__) import('./ReactotronConfig');

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
