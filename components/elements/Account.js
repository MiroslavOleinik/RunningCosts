import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';

const mapStateToProps = ({ userName }) => ({
  userName: userName,
});

class Account extends Component {
  render() {
    const { userName } = this.props;
    return (
      <Text style={styles.user}>{userName}</Text>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    fontSize: 16,
    textTransform: 'capitalize',
  }
});

export default connect(mapStateToProps)(Account);
