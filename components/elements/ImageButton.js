import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet } from 'react-native';

const ImageButton = ({ uri, onpress=() => {console.log('You have no function here!')} }) => (
  <TouchableOpacity
    onPress={onpress}
  >
    <Image
      style={styles.imageStyles}
      source={{uri: uri}}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imageStyles: {
    alignSelf: 'center',
    height: 120,
    width: 120,
  },
})

export default ImageButton;
