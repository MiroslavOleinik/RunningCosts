import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { changeScreen } from '../../store/reducer';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity } from 'react-native';

const mapStateToProps = ({ currentScreen }) => ({
  currentScreen: currentScreen,
});

const mapDispatchToProps = (dispatch) => ({
  changeScreenDispatch: (screen) => {
    dispatch(changeScreen(screen));
  }
});

class Navigation extends Component {
  setScreen(screen) {
    const { changeScreenDispatch } = this.props;
    changeScreenDispatch(screen);
  }

  render() {
    const { currentScreen } = this.props;
    return (
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => {this.setScreen('Charges')}}
          style={currentScreen === 'Charges' ? styles.buttonActive : styles.button}
        >
          <Text style={styles.text}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this.setScreen('ChargeForm')}}
          style={currentScreen === 'ChargeForm' ? styles.buttonActive : styles.button}
        >
          <Text style={styles.text}>
            Add Charge
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#e5e9ec',
    flex: 1,
    height: 70,
  },
  buttonActive: {
    justifyContent: 'center',
    backgroundColor: '#d6dce0',
    flex: 1,
    height: 70,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
