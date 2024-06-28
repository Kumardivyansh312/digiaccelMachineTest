/**
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import App from './App';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { name as appName } from './app.json';
import { store } from './app/redux/store';
import { NativeBaseProvider } from 'native-base';

function Main() {
  return (
    <StoreProvider store={store}>
      <NativeBaseProvider>
        <PaperProvider>
          <App />
        </PaperProvider>
      </NativeBaseProvider>
    </StoreProvider>
  );
}


AppRegistry.registerComponent(appName, () => Main);
