import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))


import {color} from './theme/baseTheme';
import { isIphoneX } from './utils/deviceInfo';

import Routes from './routes';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.outerView = isIphoneX() ? SafeAreaView : View;
  }

  render() {
    return (
      <this.outerView style={{ flex: 1, backgroundColor: color.dark_blue }}>
          <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
            <Routes />
      </this.outerView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
});
