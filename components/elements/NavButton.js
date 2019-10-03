import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text } from 'react-native';
import { changeScreen } from '../../store/reducer';

const mapStateToProps = ({ currentScreen }) => ({
  currentScreen: currentScreen,
})

const mapDispatchToProps = (dispatch) => ({
  changeScreenDispatch: (screen) => {
    dispatch(changeScreen(screen))
  }, 
});

class NavButton extends Component {
  navigate(to) {
    const { changeScreenDispatch } = this.props;
    changeScreenDispatch(to);
  }

  render() {
    const { title, to } = this.props;
    return (
      <Text
        style={styles.button}
        onPress = {() => this.navigate(to)}>{title}</Text>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    color: '#186cea',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavButton);
