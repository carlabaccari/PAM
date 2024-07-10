import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import Home from './components/Home/index.js';
import Favs from './components/Favs/index.js';
import Map from './components/Features/index.js';
import {store} from './components/reducers/store.js';
import messaging from '@react-native-firebase/messaging';
import Camera from './components/Camera/index.js';
const Drawer = createDrawerNavigator();

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken(); //token del dispositivo para que las notificaciones se envien
    console.log('fcm token:', token);
  };

  useEffect(() => {
    
    requestUserPermission();
    getToken();
  }, []);

      return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Favs" component={Favs} />
          <Drawer.Screen name="Maps" component={Map} />
          <Drawer.Screen name="Camera" component={Camera} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
