import React, { Component } from 'react';
import { StyleSheet, View, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Alert } from 'react-native';
import { Input } from 'react-native-elements';


import { img } from '../assets/images';
import { color, normalize, windowWidth, fontSize } from '../theme/baseTheme';
import firebase from '../utils/firebaseDb';



class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      secureText: true,
    }

    this.onSubmit = this.onSubmit.bind(this);

  }


  onSubmit() { 
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
      })
      .catch((error) => {
        alert(error)
        console.log(error)
      }) 
    }
    this.setState({ email : '', password : '',});
    Keyboard.dismiss();
  }


  render() {
    return ( 
          <KeyboardAvoidingView style={styles.container} behavior={Platform.select({android: undefined, ios: 'padding'})}>
                 <View style={{marginHorizontal: normalize(20)}}>
                   <Text style={{fontSize: fontSize.large}}>Login</Text>
                   <Input 
                    placeholder= 'Email'
                    inputStyle={{ textAlign: 'center' }}
                    inputContainerStyle={styles.inputContainer}
                    disableFullscreenUI={true}
                    placeholderTextColor={color.light_grey}
                    onChangeText={(val) => this.setState({ email: val })}
                    value={this.state.email}
                    returnKeyType='next'
                    onSubmitEditing={() => { this.password.focus(); }} 
                    autoCapitalize = 'none'           
                    />               
                    <Input 
                    placeholder= 'Password'
                    inputStyle={{ textAlign: 'center' }}
                    inputContainerStyle={styles.inputContainer}
                    disableFullscreenUI={true}
                    placeholderTextColor={color.light_grey}
                    onChangeText={(val) => this.setState({ password : val })}
                    secureTextEntry={this.state.secureText}
                    value={this.state.password}
                    ref={(input) => { this.password = input; }} 
                    onSubmitEditing={() => this.onSubmit()}                  
                    />
                 </View>
                    <TouchableOpacity onPress={this.onSubmit}>
                      <Image style={styles.button} source={img.button.login}/>
                    </TouchableOpacity>     
          </KeyboardAvoidingView>                 
      
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
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },

    inputContainer: {
      alignSelf: 'center',
      backgroundColor: color.grey,
      borderRadius: normalize(5),
      marginBottom: normalize(10)
  },

  });
  
  export default Login;