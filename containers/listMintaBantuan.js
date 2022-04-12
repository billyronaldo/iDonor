import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  Switch,
} from 'react-native';

import {fontSize, color, normalize, windowHeight} from '../theme/baseTheme';
import {img} from '../assets/images';
import Geolocation from 'react-native-geolocation-service';
import 'firebase/firestore';
import firebase from '../utils/firebaseDb';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../redux/actions/index';
import {firestore} from 'firebase';

const geolib = require('geolib');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panel: {
    height: windowHeight() * 0.17,
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(5),
    marginVertical: normalize(5),
    marginHorizontal: normalize(10),
    backgroundColor: color.white,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  panelText: {
    flex: 0.37,
  },
  panelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: normalize(24),
    height: normalize(24),
    resizeMode: 'contain',
    marginLeft: normalize(10),
  },
});

class listMintaBantuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: this.props.currentUser.locationOn,
      lat: null,
      long: null,
      requests: [],
    };
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
    this.fetchRequests();
  }

  toggleSwitch = (value) => {
    this.setState({toggled: value});
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        //cooridinate set for running on emulator
        geo_point: new firestore.GeoPoint(this.state.lat, this.state.long),
        locationOn: value,
      });
  };

  fetchRequests() {
    this.subscriber = firebase
      .firestore()
      .collection('requests')
      .onSnapshot((docs) => {
        let requests = [];
        docs.forEach((doc) => {
          requests.push(doc.data());
        });
        this.setState({requests});
      });
  }

  check = (bloodType1, bloodType2) => {
    var AType = ['A', 'AB'];
    var BType = ['B', 'AB'];
    var ABType = ['A', 'B', 'AB'];
    var OType = ['A', 'B', 'AB', 'O'];
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

  calculateDistance(origLat, origLon, markerLat, markerLon) {
    return geolib.getDistance(
      {latitude: origLat, longitude: origLon},
      {latitude: markerLat, longitude: markerLon},
    );
  }

  checkLocation = (locationOn) => {
    if (locationOn === true) {
      return true;
    } else {
      return false;
    }
  };

  buildPanels() {
    if (this.state.requests.length > 0 && this.state.toggled === true) {
      return this.state.requests
        .filter((element) => {
          let cekDarah =
            this.check(this.props.currentUser.golDarah, element.golDarah) &&
            element.geo_point.latitude !==
              this.props.currentUser.geo_point.latitude &&
            element.geo_point.longitude !==
              this.props.currentUser.geo_point.longitude;
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
        .map((req, idx) => {
          return (
            <View key={idx} style={styles.panel}>
              <View style={{flex: 1}}>
                <View style={styles.panelRow}>
                  <Text style={styles.panelText}>Nama Resipien</Text>
                  <Text style={styles.panelText}>{req.name}</Text>
                </View>
                <View style={styles.panelRow}>
                  <Text style={styles.panelText}>Golongan Darah</Text>
                  <Text style={{flex: 0.5}}>{req.golDarah}</Text>
                </View>
                <View style={styles.panelRow}>
                  <Text style={styles.panelText}>Nomor Kontak</Text>
                  <TouchableOpacity
                    style={{flex: 0.5}}
                    onPress={() => {
                      Linking.openURL(`tel:${req.noHp}`);
                    }}>
                    <Text style={{color: color.red}}>{req.noHp}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.panelRow}>
                  <Text style={styles.panelText}>Lokasi</Text>
                  <Text style={styles.panelText}>{req.lokasi}</Text>
                </View>
                <View style={styles.panelRow}>
                  <Text style={{flex: 1}}>Catatan</Text>
                  <Text style={{flex: 1.45}}>{req.note}</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`tel:${req.noHp}`);
                      }}>
                      <Image source={img.button.phone} style={styles.button} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        });
    } else if (
      this.state.requests.length === 0 &&
      this.state.toggled === true
    ) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: fontSize.regular + 1}}>
            Tidak ada request saat ini
          </Text>
        </View>
      );
    } else if (this.state.toggled === false) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: fontSize.regular + 1}}>
            Anda belum bersedia menjadi donor
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Text style={{fontSize: fontSize.regular + 2}}>
            Bersedia menjadi pendonor
          </Text>
          <Switch
            onValueChange={this.toggleSwitch}
            value={this.state.toggled}
            trackColor={{true: color.red, false: 'grey'}}
          />
        </View>
        <ScrollView style={{marginTop: normalize(20)}}>
          {this.buildPanels()}
        </ScrollView>
      </View>
    );
  }
}

export const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(listMintaBantuan);
