import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RNRasa from './RNRasa'; // your rasa host, for example:
const HOST = 'http://192.168.1.10:5005';

const RasaChat = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <RNRasa
          // emptyResponseMessage="Sorry, I dont understand"
          host={HOST}
          onSendMessFailed={error => console.log(error)}
        />
      </SafeAreaView>
    </>
  );
};
export default RasaChat;
