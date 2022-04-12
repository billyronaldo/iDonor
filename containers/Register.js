import React, { Component } from 'react';
import { StyleSheet, View, Image, Keyboard, Text, TouchableOpacity, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import "firebase/firestore";
import "firebase/firestore"; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { img } from '../assets/images';
import { color, normalize, windowWidth, fontSize } from '../theme/baseTheme';
import firebase from '../utils/firebaseDb';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      noHp: '',
      golDarah: '',
      gender:'',
      secureText: true,
      umur:'',
      address:''

    }

    this.onSubmit = this.onSubmit.bind(this);

  }


  onSubmit() {
    const {email, password, name, noHp, golDarah, gender, umur, address} = this.state;
      if(email === '' && password === '' && name === '' && noHp === '' && golDarah === '' && gender === '' && umur === '' && address === '') {
        Alert.alert('Masukan semua data untuk registrasi!')
      } else if(umur < 17 || umur > 65){
        Alert.alert('Umur harus antara 18-65 tahun')
      }
        else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                        noHp,
                        golDarah,
                        gender,
                        umur,
                        address
                    })
                console.log(res)
            })
          .catch((error) => {
          alert(error)
          console.log(error)
        })      
      }
      this.setState({ name: '', email : '', password : '', noHp:'', golDarah: '', gender:'', umur: '', address:''});
      Keyboard.dismiss();
  }


  render() {
    return ( 
          <KeyboardAwareScrollView>
                 <View style={{marginHorizontal: normalize(20), marginVertical: normalize(15)}}>
                   <Text style={{fontSize: fontSize.large, marginBottom: normalize(5)}}>Register</Text>
                    <View style={{marginTop: normalize(15)}}>
                    <Input 
                        placeholder= 'Nama'
                        inputContainerStyle={styles.inputContainer}
                        disableFullscreenUI={true}
                        placeholderTextColor={color.black}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        returnKeyType='next'        
                        />
                        <Input 
                        placeholder= 'Email'
                        inputContainerStyle={styles.inputContainer}
                        disableFullscreenUI={true}
                        placeholderTextColor={color.black}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        returnKeyType='next'
                        autoCapitalize = 'none'
                        keyboardType='email-address'           
                        />               
                        <Input 
                        placeholder= 'Password'
                        inputContainerStyle={styles.inputContainer}
                        disableFullscreenUI={true}
                        placeholderTextColor={color.black}
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={this.state.secureText}
                        value={this.state.password} 
                        />
                        <Input 
                        placeholder= 'Nomor HP'
                        inputContainerStyle={styles.inputContainer}
                        disableFullscreenUI={true}
                        placeholderTextColor={color.black}
                        onChangeText={(noHp) => this.setState({ noHp })}
                        value={this.state.noHp} 
                        keyboardType='phone-pad'             
                        />
                        <Input 
                        placeholder= 'Umur'
                        inputContainerStyle={styles.inputContainer}
                        disableFullscreenUI={true}
                        placeholderTextColor={color.black}
                        onChangeText={(umur) => this.setState({ umur })}
                        value={this.state.umur} 
                        keyboardType='number-pad'          
                        />
                        <Input 
                        placeholder= 'Alamat'
                        inputContainerStyle={styles.inputContainer}
                        disableFullscreenUI={true}
                        placeholderTextColor={color.black}
                        onChangeText={(address) => this.setState({ address })}
                        value={this.state.address}
                        returnKeyType='next'        
                        />
                        <Picker
                        style={{
                            marginHorizontal: 0.02 * windowWidth(),
                            backgroundColor: color.grey,
                            borderRadius: normalize(5),}}
                        selectedValue={this.state.gender}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({gender: itemValue})
                        }>
                        <Picker.Item label="Jenis Kelamin" value="null" />
                        <Picker.Item label="Pria" value="Pria" />
                        <Picker.Item label="Wanita" value="Wanita" />
                      </Picker> 
                        <Picker
                        style={{
                            marginHorizontal: 0.02 * windowWidth(),
                            backgroundColor: color.grey,
                            borderRadius: normalize(5),
                            marginVertical: normalize(10),
                            marginTop: normalize(20)}}
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
                      <Image style={styles.button} source={img.button.register}/>
                    </TouchableOpacity>   
                  </View>
                      
          </KeyboardAwareScrollView>  
               
      
    );
  }
}

const styles = StyleSheet.create({

    button:{
        width: 0.5 * windowWidth(),
        marginHorizontal: normalize(10),
        resizeMode:'contain'
    },

    container: {
      flex: 1,
    },

    inputContainer: {
      alignSelf: 'center',
      backgroundColor: color.grey
  },

  });
  
  export default Register;
