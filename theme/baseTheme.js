/**
 * Declare our font sizes, colors, font family, etc for the app to refer to
 */
import { Dimensions } from 'react-native';
import { moderateScale as normalize } from 'react-native-size-matters'; //adjusts sizes based on device
import * as deviceInfo from '../utils/deviceInfo';

const color = {
    black: "#3B3031",
    light_black: "#252930",
    dark_black: "#292929",
    main: "rgb(99,139,250)",
    white: "rgb(255,255,255)",
    underlayColor: "#ddd",
    red: "#e06868",
    green: "#0B6623",
    light_grey: "#bbbdc0",
    grey: "#D3D3D3",
    light_blue: "#0083e7",
    blue: "#0061ac",
    dark_blue: "#004071",
    background: "#f7f7f7",
    cyan: "#77ddaa",
    dark_cyan: "#008B8B",
    olive: "#708238",
    jade: "#00AB6B",
    cloudy: "#fcfcfc32",
    transparent: "#fcfcfc00",
    darkblue: "#012a49",
    dark_grey: "rgb(132,148,160)",
}

const fontSize = {
    small: normalize(13),
    regular: normalize(15),
    large: normalize(22),
    xLarge: normalize(26),
    xxLarge: normalize(34)
}

const fontFamily = {
    Poppins: "Poppins-Regular",
    PoppinsMedium: "Poppins-Medium",
    PoppinsBold: "Poppins-Bold"
}

const windowWidth = () => {
    if (deviceInfo.isIphoneX()) 
        return Dimensions.get('window').width - deviceInfo.getIPhoneXInsets('left') - deviceInfo.getIPhoneXInsets('right');
    else
        return Dimensions.get('window').width;

}
const windowHeight = () => {
    if (deviceInfo.isIphoneX()) 
        return Dimensions.get('window').height - deviceInfo.getIPhoneXInsets('top') - deviceInfo.getIPhoneXInsets('bottom');
    else
        return Dimensions.get('window').height;
}
const orientation = () => Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait';

export {
    color,
    fontSize,
    fontFamily,
    windowWidth,
    windowHeight,
    normalize,
    orientation
}
