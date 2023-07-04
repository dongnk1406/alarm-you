import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';
import mmkvStorage from 'src/redux/mmkvStorage';
import {reactotronRedux} from 'reactotron-redux';

let scriptHostname = 'localhost';

if (__DEV__) {
  const {scriptURL} = NativeModules.SourceCode;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}
Reactotron.setAsyncStorageHandler(mmkvStorage)
  .configure({name: 'Alarm You', host: scriptHostname}) // controls connection & communication settings
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .use(reactotronRedux())
  .connect();

// Let's clear Reactotron on every time we load the app
Reactotron.clear();

export default Reactotron;
