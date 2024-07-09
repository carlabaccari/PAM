import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import app from './components/connection.js';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Background message handled:', remoteMessage);
//   });
AppRegistry.registerComponent(appName, () => App);
