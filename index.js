/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
if (__DEV__) import('./ReactotronConfig');

AppRegistry.registerComponent(appName, () => App);
