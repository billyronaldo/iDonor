import React, { Component } from 'react';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

//import component
import Splash from './components/Splash';
import TabBar from './components/TabBar';
import PageHeader from './components/Header'

//import container
import Landing from './containers/LandingPage';
import Login from './containers/Login'
import Register from './containers/Register';
import Home from './containers/Home'
import Profile from './containers/Profile';
import listMintaBantuan from './containers/listMintaBantuan';
import mapView from './containers/mapView';
import RequestDonor from './containers/RequestDonor';
import Information from './containers/Information';

class Routes extends Component {
  constructor() {
    super();
    this.state = {
        isLoggedIn: false,
        isReady: false
    }
}

componentDidMount(){
  firebase.auth().onAuthStateChanged((user) =>{
    if(!user){
      this.setState({
        isLoggedIn: false,
        isReady: true
      })
    }
    else{
      this.setState({
        isLoggedIn: true,
        isReady: true
      })
    }
  })
}

  render() {
    console.disableYellowBox = true; 
    if(!this.state.isReady){
      return(
        <Splash />
      )
    }
    if(!this.state.isLoggedIn){
      return (
        <Provider store={store}>
            <Router>
              <Scene key="root" hideNavBar>
                <Scene key="Landing" component={Landing} title="Landing" hideNavBar initial/>
                <Scene key="Login" component={Login} title="Login" hideNavBar/>
                <Scene key="Register" component={Register} title="Register" hideNavBar/>  
              </Scene>
            </Router>
        </Provider>
          );
        }

      return(
        <Provider store={store}>
          <Router>
          <Scene key="Header" navBar={() => <PageHeader title={Actions.currentScene.substring(1)} hideNavBar/>}>
          <Scene tabs={true} tabBarComponent={() => <TabBar hideNavBar/>} lazy={true} animationEnabled={false} swipeEnabled={false} hideNavBar>
            <Scene key="root" hideNavBar>
                  <Scene key="Home" component={Home} title="Home" hideNavBar/> 
                  <Scene key="Profile" component={Profile} title="Profile" hideNavBar/>  
                  <Scene key="mapView" component={mapView} title="mapView" hideNavBar/>    
                  <Scene key="listMintaBantuan" component={listMintaBantuan} title="listMintaBantuan" hideNavBar/>
                  <Scene key="RequestDonor" component={RequestDonor} title="RequestDonor" hideNavBar/>
                  <Scene key="Information" component={Information} title="Information" hideNavBar/>           
              </Scene>
            </Scene>
            </Scene>
          </Router>
        </Provider>

      );
  }
}

export default Routes;