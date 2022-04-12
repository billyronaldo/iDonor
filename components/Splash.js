import React from 'react';
import { View, ActivityIndicator, Image, StyleSheet, ImageBackground } from 'react-native';

import { color, windowHeight } from "../theme/baseTheme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        height: 0.2 * windowHeight(),
        resizeMode: 'contain'
    },

    activityIndicatorContainer: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true} size='large' color={color.black}/>
                </View>
            </View>
        );
    }
}
