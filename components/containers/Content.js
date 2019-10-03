import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Charges from './ChargesScroll';
import { StyleSheet, Text, View } from 'react-native';

const mapStateToProps = ({ charges, currentMonth }) => ({
  charges: charges,
  currentMonth: currentMonth,
});

class Content extends Component {

  render() {
    const { charges, currentMonth } = this.props;
    const { runningCosts, billsSum } = charges[currentMonth];
    return (
      <Fragment>
        <View style={styles.header}>
          <Text style={styles.title}>Charges</Text>
          <Text>{billsSum}</Text>
        </View>
        <Charges costs={runningCosts}/>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
});

export default connect(mapStateToProps)(Content);
