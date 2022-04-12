import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


import { img } from '../assets/images';
import { normalize, windowWidth, fontSize } from '../theme/baseTheme';


class Landing extends Component {
  constructor() {
    super();

    this.onRegister = this.onRegister.bind(this);
    this.onLogin = this.onLogin.bind(this);

  }

  onRegister() { 
    Actions.Register();

  }
  onLogin() { 
    Actions.Login();

  }


  render() {
    return ( 
          <View style={styles.container}>
                 <View style={{marginHorizontal: normalize(20)}}>
                   <Text style={{fontSize: fontSize.large}}>iDonor</Text>
                   <Text>Ini adalah platform untuk menghubungkan,</Text>
                   <Text>orang yang membutuhkan darah dan pendonor darah</Text>
                 </View>
                 
                 <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.onLogin}>
                      <Image style={styles.button} source={img.button.login}/>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={this.onRegister}>
                      <Image style={styles.button} source={img.button.register}/>
                    </TouchableOpacity> 
                 </View>
          </View>                 
      
    );
  }
}

const styles = StyleSheet.create({

    button:{
        width: 0.45 * windowWidth(),
        marginHorizontal: normalize(10),
        resizeMode:'contain'
    },

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },


  });
  
  export default Landing;