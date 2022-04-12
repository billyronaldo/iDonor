import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { color, windowWidth, normalize, windowHeight } from '../theme/baseTheme';

import { Actions } from 'react-native-router-flux';
import { img } from '../assets/images';

class TabBar extends Component {

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => Actions.Home()}>     
                    <Image 
                     source={img.button.home}
                     style={styles.button} />
                </TouchableOpacity>
               <TouchableOpacity onPress={() => Actions.Profile()}>
                  <Image 
                   source={img.button.profile}
                   style={styles.button} />
               </TouchableOpacity>        
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: color.red,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },

    button: {
        width: 0.31 * windowWidth(), 
        height: 0.2 * windowHeight(), 
        resizeMode: 'contain',
        marginHorizontal: normalize(10)
    }

  });

export default TabBar;