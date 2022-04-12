import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {Actions} from 'react-native-router-flux';

import {fontSize, color, normalize, windowWidth} from '../theme/baseTheme';
import {img} from '../assets/images';
import Geolocation from 'react-native-geolocation-service';
import 'firebase/firestore';
import firebase from '../utils/firebaseDb';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../redux/actions/index';
import {firestore} from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    alignSelf: 'center',
    backgroundColor: color.grey,
  },
});

class RequestDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: this.props.currentUser.locationOn,
      lat: null,
      long: null,
      name: '',
      noHp: '',
      note: '',
      golDarah: '',
      lokasi: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  getLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  componentDidMount() {
    this.getLocation();
    this.props.fetchUser();
  }

  onSubmit() {
    const {name, noHp, golDarah, note, lokasi} = this.state;
    if (
      name === '' &&
      noHp === '' &&
      note === '' &&
      golDarah === '' &&
      lokasi === ''
    ) {
      Alert.alert('Isi semua form!');
    } else {
      firebase
        .firestore()
        .collection('requests')
        .doc(firebase.auth().currentUser.uid)
        .set({
          name,
          noHp,
          golDarah,
          note,
          lokasi,
          geo_point: new firestore.GeoPoint(this.state.lat, this.state.long),
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
      Alert.alert('Berhasil Minta Request');
      Actions.Home();
    }
    this.setState({name: '', noHp: '', golDarah: '', note: ''});
    Keyboard.dismiss();
  }

  render() {
    return (
      <KeyboardAwareScrollView
        behavior={Platform.select({android: 'padding', ios: 'padding'})}>
        <View
          style={{
            marginHorizontal: normalize(20),
            marginVertical: normalize(15),
          }}>
          <Text style={{fontSize: fontSize.large, marginBottom: normalize(5)}}>
            Form Request Donor
          </Text>
          <View style={{marginTop: normalize(15)}}>
            <Input
              placeholder="Nama Resipien"
              inputContainerStyle={styles.inputContainer}
              disableFullscreenUI={true}
              placeholderTextColor={color.black}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              returnKeyType="next"
            />
            <Input
              placeholder="Nomor Kontak Resipien atau Keluarga"
              inputContainerStyle={styles.inputContainer}
              disableFullscreenUI={true}
              placeholderTextColor={color.black}
              onChangeText={(noHp) => this.setState({noHp})}
              value={this.state.noHp}
              keyboardType="phone-pad"
            />
            <Input
              placeholder="Lokasi Resipien, misal: PMI Bogor"
              inputContainerStyle={styles.inputContainer}
              disableFullscreenUI={true}
              placeholderTextColor={color.black}
              onChangeText={(lokasi) => this.setState({lokasi})}
              value={this.state.lokasi}
            />
            <Input
              placeholder="Catatan, misal: butuh 2 kantong, pasien tumor"
              inputContainerStyle={styles.inputContainer}
              disableFullscreenUI={true}
              placeholderTextColor={color.black}
              onChangeText={(note) => this.setState({note})}
              value={this.state.note}
              numberOfLines={2}
              maxLength={50}
              multiline={true}
            />

            <Picker
              style={{
                marginHorizontal: 0.02 * windowWidth(),
                backgroundColor: color.grey,
                borderRadius: normalize(5),
              }}
              selectedValue={this.state.golDarah}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({golDarah: itemValue})
              }>
              <Picker.Item label="Golongan Darah" value="null" />
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="AB" value="AB" />
              <Picker.Item label="O" value="O" />
            </Picker>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={this.onSubmit}>
            <Image style={styles.button} source={img.button.submit} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestDonor);
