import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import { gyroscope } from "react-native-sensors";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
const Features = () => {
const [markers, setMarkers] = useState([]);
const mapRef = useRef(null);
const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
        locationProvider: 'playServices',
      });
    


      const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Current position:', position);
            console.log('Latitude:', latitude, 'Longitude:', longitude);
    
            const newRegion = {
              ...region,
              latitude,
              longitude,
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
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={region}
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
    <Button title="Agregar mi ubicación" onPress={getCurrentLocation} />
  </View>
  
  );

};

export default Features;