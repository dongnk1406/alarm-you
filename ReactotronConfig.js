import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';
let scriptHostname = 'localhost';
if (__DEV__) {
  const {scriptURL} = NativeModules.SourceCode;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}
Reactotron.setAsyncStorageHandler()
  .configure({host: scriptHostname}) // controls connection & communication settings
  .useReactNative()
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  // add all built-in react native plugins
  .connect();
