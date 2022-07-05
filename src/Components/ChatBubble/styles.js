import { Platform, StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Theme';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        maxWidth: '85%',
    },
    bubble: {
        padding: Metrics.smallMargin,
        borderRadius: 15,
    },
    leftBubble: {
        borderBottomStartRadius: 0,
        backgroundColor: '#43a7fe',
        marginLeft: Metrics.ratio(10)
    },
    rightBubble: {
        backgroundColor: '#e6f2fb',
        borderBottomEndRadius: 0,
        marginRight: Metrics.ratio(10)
    },
    bubbleText: {
        letterSpacing: 0.54,
        fontSize: Metrics.ratio(14),
        lineHeight: 24,
    },
    profileImage: {
        height: Metrics.ratio(56),
        width: Metrics.ratio(56),
        borderRadius: Metrics.ratio(56) / 2,
    },
});

export default styles;
