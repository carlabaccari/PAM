import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import { launchCamera } from 'react-native-image-picker';
import styles from './features_style'; 
import { async } from '@firebase/util';
const Map = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Permission Denied');
        Alert.alert('Permission Denied', 'Location permission is required to show your current location.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Current position:', position);

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };

        console.log('New Region:', newRegion);

        setRegion(newRegion);
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          { latitude, longitude },
        ]);

        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000); // Animar al nuevo centro del mapa
        }
      },
      (error) => {
        console.log(error);
        Alert.alert('Error', 'Unable to fetch location. Please try again.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation={true}
          loadingEnabled={true}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              title={`Marker ${index + 1}`}
              description={`Latitude: ${marker.latitude}, Longitude: ${marker.longitude}`}
            />
          ))}
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Agregar mi ubicación" onPress={getCurrentLocation} />
      </View>
    </View>
  );
};

export default Map;
