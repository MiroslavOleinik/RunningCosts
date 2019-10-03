import React, { Component } from 'react';
import { connect } from "react-redux";
import ChargeForm from './ChargeForm';
import EditChargeForm from './EditChargeForm';
import Charges from './Charges';

const mapStateToProps = ({ currentScreen, editedCharge }) => ({
  currentScreen: currentScreen,
  editedCharge: editedCharge,
});

class MainScreen extends Component {
  render() {
    const { currentScreen, editedCharge } = this.props;
    if (currentScreen === 'Charges') {
      return (
        <Charges />
      );
    } 
    if (currentScreen === 'ChargeForm') {
      return (
        <ChargeForm />
      );
    } 
    if (currentScreen === 'EditChargeForm') {
      console.log(editedCharge);
      return (
        <EditChargeForm />
      );
    }
  }
}

export default connect(mapStateToProps)(MainScreen);
