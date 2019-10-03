import React, { Component } from 'react';
import ImageButton from './ImageButton'
import { connect } from "react-redux";
import { deleteCharge, setEditCharge, changeScreen } from '../../store/reducer';
import { TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image } from 'react-native';

const mapStateToProps = ({ currentMonth }) => ({
  currentMonth: currentMonth,
});

const mapDispatchToProps = (dispatch) => ({
  deleteChargeDispatch: (data) => {
    dispatch(deleteCharge(data))
  },
  setEditChargeDispatch: (data) => {
    dispatch(setEditCharge(data))
  },
  changeScreenDispatch: (screen) => {
    dispatch(changeScreen(screen))
  },
});

class Charge extends Component {
  state = {
    isOpen: false
  }

  openImage = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  }

  hideCharge(index, month) {
    const { deleteChargeDispatch } = this.props;
    deleteChargeDispatch({
      month: month,
      index: parseInt(index),
    });
  }

  editCharge(chargeName, chargeCost, billImage, index, month) {
    const { setEditChargeDispatch, changeScreenDispatch } = this.props;
    setEditChargeDispatch({
      product: chargeName,
      price: chargeCost,
      uri: billImage,
      index: parseInt(index),
      month: month,
    });
    changeScreenDispatch('EditChargeForm');
  }

  render() {
    const { chargeName, chargeCost, billImage, index, currentMonth } = this.props;
    const { isOpen } = this.state;
    return (
      <View style={isOpen ? styles.blockOpen : styles.blockClose}>
        <TouchableOpacity
          accessible={true}
          onPress={this.openImage}
          style={styles.element}>
          <Text >{chargeName}</Text>
          <Text>{chargeCost}</Text>
        </TouchableOpacity>
        <View style={styles.openedBlock}>
          {
            billImage.length > 0
            ?
            <ImageButton
              uri={billImage}
            />
            :
            <View />
          }
          <View>
            <Text
              style={styles.button}
              onPress={() => {this.editCharge(chargeName, chargeCost, billImage, index, currentMonth)}}
            >
              Edit
            </Text>
            <Text
              style={styles.button}
              onPress={() => {this.hideCharge(index, currentMonth)}}
            >
              Remove
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  blockClose: {
    justifyContent: 'space-between',
    overflow: 'hidden',
    maxHeight: 37,
  },
  blockOpen: {
    justifyContent: 'space-between',
    overflow: 'hidden',
    maxHeight: 155,
  },
  openedBlock: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  element: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
  }, 
  button: {
    backgroundColor: '#e5e9ec',
    marginTop: 15,
    padding: 10,
    textAlign: 'center',
    width: 100,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Charge);
