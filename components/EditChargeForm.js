import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { editCharge, changeScreen } from '../store/reducer';
import NavButton from './elements/NavButton';
import FormButton from './elements/FormButton';
import ImageButton from './elements/ImageButton';
import InputField from './elements/InputField';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  CameraRoll,
  Alert,
  View } from 'react-native';

const mapStateToProps = ({ charges, currentMonth, currentScreen, editedCharge }) => ({
  charges: charges,
  currentMonth: currentMonth,
  currentScreen: currentScreen,
  editedCharge: editedCharge,
});

const mapDispatchToProps = (dispatch) => ({
  editChargeDispatch: (charge) => {
    dispatch(editCharge(charge))
  },
  changeScreenDispatch: (screen) => {
    dispatch(changeScreen(screen));
  }
});

class EditChargeForm extends Component {
  state = {
    status: null,
    product: this.props.editedCharge.product,
    price: `${this.props.editedCharge.price}`,
    uri: this.props.editedCharge.uri,
  }

  componentDidMount() {
    this.getPermissionToCameraRollAsync();
    this.getPermissionToCameraAsync();
  }

  getPermissionToCameraRollAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }

  getPermissionToCameraAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }

  launchImageLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      this.setState({ uri: result.uri });
    }
  }

  launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      CameraRoll.saveToCameraRoll(result.uri);
      this.setState({ uri: result.uri });
    }
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

  editCurrentCharge = () => {
    const { editChargeDispatch, changeScreenDispatch, editedCharge } = this.props;
    const { product, price, uri } = this.state;
    if (product.length !== 0 && price.length !== 0) {
      const charge = {
        name: product,
        price: parseInt(price),
        image: uri,
        index: editedCharge.index,
        month: editedCharge.month,
      }
      Alert.alert('Updated', 'Your charge successfuly updated.');
      editChargeDispatch(charge);
      changeScreenDispatch('Charges');
    } else {
      Alert.alert('Ooops.. Something going wrong.', 'Please, fill in the missing information.');
    }
  }

  render() {
    const { product, price, uri } = this.state;
    return (
      <Fragment>
        <View style={styles.header}>
          <NavButton
            to="Charges"
            title="Back"
          />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.content}>
            <InputField
              placeholder='Product name'
              keyboard='default'
              changeText={(text) => {this.onChangeHandler(text, 'product')}}
              value={product}
            />
            <InputField
              placeholder='Product price'
              keyboard='numeric'
              changeText={(text) => {this.onChangeHandler(text, 'price')}}
              value={price}
            />
            <ImageButton
              uri={uri}
              onpress={this.launchImageLibrary}
            />
            <FormButton
              title="Add bill photo"
              onpress = {this.launchImageLibrary}
            />
            <FormButton
              title="Take a snap"
              onpress = {this.launchCamera}
            />
            <FormButton
              title="Edit"
              onpress={this.editCurrentCharge}
            />
        </View>
        </TouchableWithoutFeedback> 
      </Fragment>
    );
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
    flex: 1,
    padding: 20,
  },
  cameraShot: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    height: 50,
    width: 50,
    backgroundColor: '#fff',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditChargeForm);
