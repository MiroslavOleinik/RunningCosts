import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, View } from 'react-native';
import Account from './Account';
import NavButton from './NavButton';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Account />
        <NavButton
          title="Add New Charge"
          to="ChargeForm" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    borderTopColor: '#000',
    borderTopWidth: 20,
    backgroundColor: '#e5e9ec',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1
  }
});

export default Header;
