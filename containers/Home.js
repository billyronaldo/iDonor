import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { firestore } from 'firebase';
import "firebase/firestore"; 
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import firebase from '../utils/firebaseDb';


import { img } from '../assets/images';
import { normalize, windowWidth, fontSize } from '../theme/baseTheme';
import { Actions } from 'react-native-router-flux';
import {fetchUser} from '../redux/actions/index'
import Splash from '../components/Splash';




class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      //cooridinate set for running on emulator
      lat: -6.64064,
      long: 106.8273983,
    }

    this.onListPendonor = this.onListPendonor.bind(this);
    this.onListMintaBantuan = this.onListMintaBantuan.bind(this);
    this.showProfile = this.showProfile.bind(this);
  }

  getLocation(){
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
        console.log(position)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message); 
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid).update({
          //cooridinate set for running on emulator
          geo_point: new firestore.GeoPoint(this.state.lat, this.state.long),
        })
  }

  componentDidMount(){
    this.props.fetchUser();
    this.getLocation();
  }

  onListPendonor() { 
    Actions.mapView();
  }

  onListMintaBantuan() { 
    Actions.listMintaBantuan();
  }

  onListMintaDonor() { 
    Actions.RequestDonor();
  }

  showProfile(){
    Actions.Profile();
  }


  render() {
    const {currentUser} = this.props
    if (currentUser == undefined){
      return(
        <Splash />
      )
    }
    return ( 
          <View style={styles.container}>
                 <View style={{marginHorizontal: normalize(20)}}>
                   <Text style={{fontSize: fontSize.large}}>Halo, {currentUser.name}</Text>  
                 </View>

                 <View>
                    <TouchableOpacity onPress={this.onListPendonor}>
                      <Image style={styles.button} source={img.button.cari}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onListMintaBantuan}>
                      <Image style={styles.button} source={img.button.pendonor}/>
                    </TouchableOpacity>  

                    <TouchableOpacity onPress={this.onListMintaDonor}>
                      <Image style={styles.button} source={img.button.request}/>
                    </TouchableOpacity>  
                 </View>        
          </View>                 
      
    );
  }
}

const styles = StyleSheet.create({

    button:{
        width: 0.5 * windowWidth(),
        marginHorizontal: normalize(10),
        resizeMode:'contain',
        marginVertical: normalize(15)
    },

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },

  });

  export const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
  })
  export const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);