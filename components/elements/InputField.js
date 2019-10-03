import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput } from 'react-native';

class InputField extends Component {
  render() {
    const { placeholder, keyboard, changeText, value='' } = this.props;
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText = {changeText}
        keyboardType={keyboard}
        value={value}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default InputField;