import React, { useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import { getUniqueId } from 'react-native-device-info';



import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';


const CONSTANTS = {
  API_URL: 'https://sdk-api.louie7ai.com/api/v1/',
  X_API_KEY: 'f2cbd802-5b5e-43c6-8dd4-3915ab34752c'
}

const apiInstance = axios.create({
  baseURL: CONSTANTS.API_URL,
  timeout: 10000,
  headers: {
    'X-API-Key': CONSTANTS.X_API_KEY
  }
});

apiInstance.interceptors.request.use((config) => {
  console.log(config)
  return config;
})

const postDevice = async (identifier: string) => {
  try {
    const { data } = await apiInstance.post('devices', { identifier })
    const config = await apiInstance.get('application/config', {
      headers: {
        'Authorization': data.access
      }
    })
    Alert.alert(`Config fetch was successful`, `\nAPI-KEY:  ${config.data.ApiKey} \n\nBucketURL: ${config.data.BucketApi} \n\nDevice ID: ${identifier}`)
  } catch (e) {
    Alert.alert('Something wrong happened');
  }

}


const App = () => {

  useEffect(() => {
    const deviceId = getUniqueId();
    postDevice(deviceId)
  }, [])

  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: Colors.darker,
          }}>

          <Text>Louie SDK</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
