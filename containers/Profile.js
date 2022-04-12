import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from '../utils/firebaseDb';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import 'firebase/firestore';

import {img} from '../assets/images';
import {
  color,
  normalize,
  windowWidth,
  windowHeight,
  fontSize,
} from '../theme/baseTheme';
import {Actions} from 'react-native-router-flux';
import {fetchUser} from '../redux/actions/index';
import Splash from '../components/Splash';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      requests: {
        name: null,
        golDarah: null,
        noHp: null,
        lokasi: null,
        note: null,
      },
    };
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
    this.fetchRequests();
  }

  onLogout() {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        locationOn: false,
      });
    firebase.auth().signOut();
  }

  fetchRequests() {
    this.subscriber = firebase
      .firestore()
      .collection('requests')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({
            requests: {
              name: doc.data().name,
              golDarah: doc.data().golDarah,
              noHp: doc.data().noHp,
              lokasi: doc.data().lokasi,
              note: doc.data().note,
            },
          });
        } else if (!doc.exists) {
          this.setState({
            requests: {
              name: null,
              golDarah: null,
              noHp: null,
              lokasi: null,
              note: null,
            },
          });
        }
      });
  }

  deleteData() {
    firebase
      .firestore()
      .collection('requests')
      .doc(firebase.auth().currentUser.uid)
      .delete()
      .then((res) => {
        console.log(res);
        this.setState({
          requests: {},
        });
        Alert.alert('Berhasil Akhiri Request');
        Actions.Home();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }

  buildPanels() {
    console.log(this.state.requests, 'tess request');
    if (this.state.requests.name !== null) {
      return (
        <View style={styles.panel}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: fontSize.regular + 1, color: color.red}}>
              Request Donor Anda
            </Text>
            <View style={styles.panelRow}>
              <Text style={styles.panelText}>Nama Resipien</Text>
              <Text style={styles.panelText}>{this.state.requests.name}</Text>
            </View>
            <View style={styles.panelRow}>
              <Text style={styles.panelText}>Golongan Darah</Text>
              <Text style={{flex: 0.5}}>{this.state.requests.golDarah}</Text>
            </View>
            <View style={styles.panelRow}>
              <Text style={styles.panelText}>Nomor Kontak</Text>
              <TouchableOpacity style={{flex: 0.5}}>
                <Text>{this.state.requests.noHp}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.panelRow}>
              <Text style={styles.panelText}>Lokasi</Text>
              <Text style={styles.panelText}>{this.state.requests.lokasi}</Text>
            </View>
            <View style={styles.panelRow}>
              <Text style={{flex: 1}}>Catatan</Text>
              <Text style={{flex: 0.9}}>{this.state.requests.note}</Text>
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress={this.deleteData}>
                  <Text style={{color: color.red, fontSize: fontSize.regular}}>
                    Akhiri Request
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (this.state.requests.name === null) {
      return <View></View>;
    }
  }

  render() {
    const {currentUser} = this.props;
    if (currentUser == null) {
      return <Splash />;
    }
    return (
      <View style={styles.container}>
        <Text style={{fontSize: fontSize.large + 1}}>Profile</Text>
        <View style={{marginHorizontal: normalize(20)}}>
          <Text style={styles.textStyle}>
            Nama : {this.props.currentUser.name}
          </Text>
          <Text style={styles.textStyle}>
            No HP : {this.props.currentUser.noHp}
          </Text>
          <Text style={styles.textStyle}>
            Jenis Kelamin : {this.props.currentUser.gender}
          </Text>
          <Text style={styles.textStyle}>
            Golongan Darah: {this.props.currentUser.golDarah}
          </Text>
        </View>
        <TouchableOpacity onPress={() => Actions.Information()}>
          <Text style={{color: color.red, fontSize: fontSize.regular}}>
            Lihat Syarat Donor Darah
          </Text>
        </TouchableOpacity>

        {this.buildPanels()}

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.onLogout}>
            <Image style={styles.button} source={img.button.logout} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 0.65 * windowWidth(),
    marginHorizontal: normalize(10),
    resizeMode: 'contain',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  textStyle: {
    fontSize: fontSize.regular + 2,
  },
  panel: {
    height: windowHeight() * 0.2,
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
});
export const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
