import {StyleSheet} from 'react-native';
import colors from "../../Theme/Colors";
import {Metrics} from "../../Theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 0.9,
    paddingTop: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bar: {
    width:26,
    borderRadius:2.5,
    height: 5,
    backgroundColor: 'rgba(178, 178, 178, 0.5)',
    position: 'absolute',
    top: 5,
    left: Metrics.screenWidth / 2 - 13,
  },
});
export default styles;
