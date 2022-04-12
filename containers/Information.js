import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from '../utils/firebaseDb';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import "firebase/firestore"; 


import { img } from '../assets/images';
import { color, normalize, windowWidth, windowHeight, fontSize, fontFamily } from '../theme/baseTheme';
import { Actions } from 'react-native-router-flux';
import {fetchUser} from '../redux/actions/index'
import Splash from '../components/Splash';
import { firestore } from 'react-native-firebase';


class Information extends Component {
  constructor() {
    super();

  }

  render() {

    return ( 
          <View style={styles.container}>
            <Text style={{fontSize: fontSize.large + 1}}>Syarat Donor Darah</Text>
                 <View style={{marginHorizontal: normalize(20), alignItems: 'center'}}>
                   <Text style={styles.textStyle}>Usia 17 - 65 Tahun</Text>
                   <Text style={styles.textStyle}>Berat badan minimal 45 kg</Text>
                   <Text style={styles.textStyle}>Tekanan Darah Sistole : 100-170</Text>
                   <Text style={styles.textStyle}>Tekanan Darah Diastole : 70-100</Text>
                   <Text style={styles.textStyle}>Kadar Hemoglobin 12,5g% - 17,0g%</Text>
                   <Text style={styles.textStyle}>Interval donor minimal 12 minggu </Text>
                   <Text style={styles.textStyle}>atau 3 bulan sejak donor darah sebelumnya</Text>
                 </View>        
          </View>                 
      
    );
  }
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },

    textStyle: {
      fontSize: fontSize.regular + 1,
      marginVertical: normalize(5)
    },
  });
  
  export default Information;
