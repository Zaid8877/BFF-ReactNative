import {Dimensions, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const ratio = (iosSize: number, androidSize: ?number, doScale = false) =>
  Platform.select({
    ios: doScale ? scaleVertical(iosSize) : iosSize,
    android: doScale
      ? scaleVertical(androidSize || iosSize)
      : androidSize || iosSize
  });

export const scaleFont = size => RFValue(size);

export default Metrics = {
  ratio,
  defaultMargin: screenWidth * 0.05,
  smallMargin: screenWidth * 0.04,
  xsmallMargin: screenWidth * 0.02,
  largeMargin: screenWidth * 0.08,
  bottomSheetTopMargin:screenHeight*0.08,
  xsmallFont: scaleFont(9),
  smallFont: scaleFont(11),
  defaultFont: scaleFont(13),
  mediumFont: scaleFont(15),
  largeFont: scaleFont(17),
  xlargeFont: scaleFont(20),
  screenWidth,
  screenHeight
};
