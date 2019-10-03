import React from 'react';
import {
  View,
  Button, } from 'react-native';

const FormButton = ({ title, onpress }) => (
  <View>
    <Button
      title={title}
      onPress = {onpress}
    />
  </View>
);

export default FormButton;
