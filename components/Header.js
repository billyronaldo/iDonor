import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { color, fontSize, fontFamily, normalize } from '../theme/baseTheme';

const styles = StyleSheet.create({

    headerText: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.bold,
        color: color.black,
        padding: normalize(10)
    },
});

class PageHeader extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        
        return (
            <View style={{ backgroundColor: color.red}}>
                <Text style={styles.headerText}>
                    {this.props.title}
                </Text>
            </ View>
        )
    }
}

export default PageHeader;
