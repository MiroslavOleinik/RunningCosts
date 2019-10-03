import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { addCharge } from '../../store/reducer';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button } from 'react-native';

const mapStateToProps = ({ charges, currentMonth }) => ({
  charges: charges,
  currentMonth: currentMonth,
});

const mapDispatchToProps = (dispatch) => ({
  addChargeDispatch: (charge) => {
    dispatch(addCharge(charge))
  }, 
});

class Form extends Component {
  state = {
    product: '',
    price: '',
  }

  onChangeHandler(text, type) {
    if (type === 'product') {
      this.setState({
        product: text,
      })
    } else {
      this.setState({
        price: text,
      })
    }
  }

  addNewCharge() {
    const { addChargeDispatch } = this.props;
    const { product, price } = this.state;
    const charge = {
      name: product,
      price: parseInt(price),
      image: '',
    }
    addChargeDispatch(charge);
  }

  render() {
    const { product, price } = this.state;
    return (
      <Fragment>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.content}>
            <TextInput 
              style={styles.input}
              placeholder={'Product'}
              onChangeText = {(text) => {this.onChangeHandler(text, 'product')}}
              value={product}
            />
            <TextInput 
              style={styles.input}
              placeholder={'Price'}
              onChangeText = {(text) => {this.onChangeHandler(text, 'price')}}
              keyboardType={'numeric'}
              value={price}
            />
            <View>
              <Button 
                title="Add"
                onPress={() => {this.addNewCharge()}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    fontSize: 16,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
