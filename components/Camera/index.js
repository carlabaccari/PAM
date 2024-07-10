import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import styles from './camera_style';

const CameraComponent = () => {
  const [showCamera, setShowCamera] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS === 'android') {
        const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        const storagePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        setHasPermission(cameraPermission === PermissionsAndroid.RESULTS.GRANTED && storagePermission === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
    };
    getPermissions();
  }, []);

  const capturePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          const uri = response.assets[0].uri;
          console.log('Photo URI: ', uri); 
          setImageSource(uri);
          setShowCamera(false);
        }
      }
    );
  };

  const renderCamera = () => (
    <TouchableOpacity style={styles.captureButton} onPress={capturePhoto}>
      <Text style={styles.captureButtonText}>Capture</Text>
    </TouchableOpacity>
  );

  const renderImage = () => (
    <>
      {imageSource && <Image style={styles.image} source={{ uri: imageSource }} />}
      <TouchableOpacity style={styles.button} onPress={() => setShowCamera(true)}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      {showCamera ? renderCamera() : renderImage()}
    </View>
  );
};


export default CameraComponent;
