import { Dimensions, Platform } from 'react-native';

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&

    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

/**
 * iPhone X and XS are 375×812 points
 */
export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

/**
 * iPhone XR and XS Max are 414×896 points
 */
export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}

export function getIPhoneXInsets(side) {
  if (isIphoneX()) {
    switch (side) {
      case 'top':
        return orientation() === "landscape" ? 0 : 44;
      case 'bottom':
        return orientation() === "landscape" ? 24 : 34;
      case 'left':
        return orientation() === "landscape" ? 44 : 0;
      case 'right':
        return orientation() === "landscape" ? 44 : 0;
    }
  }
}

export const orientation = () => Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait';
