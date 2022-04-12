import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, Linking} from 'react-native';
import {color, normalize, windowWidth, windowHeight} from '../theme/baseTheme';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import 'firebase/firestore';
import firebase from '../utils/firebaseDb';
import {Picker} from '@react-native-picker/picker';
import {fetchUser} from '../redux/actions/index';

const geolib = require('geolib');
const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class mapView extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      latitude: null,
      longitude: null,
      distance: null,
      golDarah: '',
    };
  }

  getLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(this.state.latitude, this.state.longitude, 'tes map');
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  fetchRequests() {
    this.subscriber = firebase
      .firestore()
      .collection('users')
      .onSnapshot((docs) => {
        let users = [];
        docs.forEach((doc) => {
          users.push(doc.data());
        });
        this.setState({users});
        console.log(users);
      });
  }

  calculateDistance(origLat, origLon, markerLat, markerLon) {
    return geolib.getDistance(
      {latitude: origLat, longitude: origLon},
      {latitude: markerLat, longitude: markerLon},
    );
  }

  check = (bloodType1, bloodType2) => {
    var AType = ['A', 'O'];
    var BType = ['B', 'O'];
    var ABType = ['A', 'B', 'AB'];
    var OType = ['O'];
    if (bloodType1 == 'A' && AType.includes(bloodType2, 0)) {
      return true;
    } else if (bloodType1 == 'B' && BType.includes(bloodType2, 0)) {
      return true;
    } else if (bloodType1 == 'AB' && ABType.includes(bloodType2, 0)) {
      return true;
    } else if (bloodType1 == 'O' && OType.includes(bloodType2, 0)) {
      return true;
    } else {
      return false;
    }
  };

  componentDidMount() {
    this.props.fetchUser();
    this.fetchRequests();
    this.getLocation();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.props.currentUser.geo_point.latitude,
            longitude: this.props.currentUser.geo_point.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {this.state.users
            .filter((element) => {
              let cekDarah =
                this.check(this.state.golDarah, element.golDarah) &&
                element.geo_point.latitude !==
                  this.props.currentUser.geo_point.latitude &&
                element.geo_point.longitude !==
                  this.props.currentUser.geo_point.longitude &&
                element.locationOn === true;
              let distance = this.calculateDistance(
                this.props.currentUser.geo_point.latitude,
                this.props.currentUser.geo_point.longitude,
                element.geo_point.latitude,
                element.geo_point.longitude,
              );
              console.log(element.golDarah, cekDarah);
              if (cekDarah === true) {
                return distance <= 15000;
              } else {
                return false;
              }
            })
            .map((user, idx) => (
              <Marker
                key={idx}
                coordinate={{
                  latitude: user.geo_point.latitude,
                  longitude: user.geo_point.longitude,
                }}>
                <Callout
                  onPress={() => {
                    Linking.openURL(`tel:${user.noHp}`);
                  }}>
                  <View
                    style={{
                      height: 0.15 * windowHeight(),
                      width: 0.4 * windowWidth(),
                    }}>
                    <Text>Nama: {user.name}</Text>
                    <Text>Golongan Darah: {user.golDarah}</Text>
                    <Text style={{color: color.red}}>No HP: {user.noHp}</Text>
                    <Text>Alamat: {user.address}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
        <Picker
          style={{
            marginHorizontal: 0.02 * windowWidth(),
            backgroundColor: color.grey,
            borderRadius: normalize(5),
            marginVertical: normalize(10),
            marginTop: normalize(20),
          }}
          selectedValue={this.state.golDarah}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({golDarah: itemValue})
          }>
          <Picker.Item label="Cari Golongan Darah" value="null" />
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="AB" value="AB" />
          <Picker.Item label="O" value="O" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  picker: {
    position: 'absolute',
    backgroundColor: color.white,
    flexDirection: 'row',
    flex: 1,
    padding: 0,
  },
});

export const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(mapView);
