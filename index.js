/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { startNetworkLogging } from 'react-native-network-logger';
import App from './src/App';
import { name as appName } from './app.json';
startNetworkLogging();

AppRegistry.registerComponent(appName, () => App);
