import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Charge from '../elements/Charge'

class Charges extends Component {
  render() {
    const { costs } = this.props;
    return (
      <ScrollView style={styles.content}>
        {costs.map(({ chargeName, chargeCost, billImage, isDeleted }, index) => {
          if (!isDeleted) {
            return (
              <Charge key={index}
                index={index}
                chargeName={chargeName}
                chargeCost={chargeCost}
                billImage={billImage}
              />
            )
          }
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
  },
});

export default Charges;
