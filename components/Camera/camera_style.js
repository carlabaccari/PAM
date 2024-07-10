import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    captureButton: {
      padding: 20,
      borderRadius: 50,
      backgroundColor: 'grey',
    },
    captureButtonText: { 
        color: '#fff', 
        fontWeight: '500' },
    button: {
      position: 'absolute',
      bottom: 20,
      padding: 20,
      borderRadius: 10,
      backgroundColor: 'grey',
    },
    buttonText: { color: '#fff', fontWeight: '500' },
    image: { flex: 1, width: '100%' },
  });

  