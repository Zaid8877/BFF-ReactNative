import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
  },
  sideView: {
    width: '20%',
    alignItems: 'center',
  },
  centerView: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 42,
  },
  skip: {
    fontSize: 16,
  },
  secondaryView: {
    backgroundColor: Colors.lightGrey,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: Metrics.defaultMargin,
  },
  heading: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 5,
    color:Colors.textDark
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  iconView: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
