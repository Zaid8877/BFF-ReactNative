import {View, Text, Image, StyleSheet} from 'react-native'
import React, {useRef} from 'react'
import RootView from '../../Components/RootView'
import {Colors, Metrics} from '../../Theme'
import Images from '../../Utils/Images'
import Swiper from 'react-native-swiper'
import colors from '../../Theme/Colors'
import Button from '../../Components/Button'
import Navigator from '../../Utils/Navigator'
import {useDispatch} from 'react-redux'
import {setOnBoardingViewed} from '../../Store/actions/onBoardingActions'


export default function Intro() {
    const dispatch = useDispatch()

    const setAndDispatchToSignin =() => {
        Navigator.z('SignIn')
        dispatch(setOnBoardingViewed(true))
    }

    const renderItem = () => {
        return (
            <View style={styles.wrapper}>
                <Image source={Images.logo2} style={styles.image}/>
                <Text style={styles.heading}>{`Welcome to\nFriends forever`}</Text>
                <Text style={styles.text}>Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.</Text>
                <Button text='GET STARTED!' style={{backgroundColor: 'white', zIndex: 10}} textStyle={{color: Colors.primary}} onPress={() => setAndDispatchToSignin()}/>
            </View>
        )
    }
    return (
        <RootView background={Colors.primary} top={0} bottom={0}>
            <Text style={styles.skip} onPress={() => setAndDispatchToSignin()}>Skip</Text>
            <Image source={Images.background} style={styles.bgImage}/>
            <Swiper
                dotStyle={styles.dot}
                activeDotStyle={styles.dot}
                dotColor={Colors.backgroundLight}
                activeDotColor={colors.light}
            >
                {renderItem()}
                {renderItem()}
                {renderItem()}
                {renderItem()}
            </Swiper>

        </RootView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: Metrics.screenWidth * 0.6,
        height: Metrics.screenHeight * 0.3,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: Metrics.defaultMargin,
    },
    heading: {
        fontSize: Metrics.ratio(34),
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'left',
        marginVertical: Metrics.defaultMargin
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6
    },
    wrapper: {
        justifyContent: 'center',
        padding: Metrics.largeMargin,
        flex: 1,
    },
    bgImage: {
        height: Metrics.screenHeight * 0.5,
        width: Metrics.screenWidth * 0.8,
        position: 'absolute',
        bottom: -Metrics.screenHeight * 0.2,
        left: -Metrics.screenWidth * 0.3,
        opacity: 0.5,
        resizeMode: 'contain'
    },
    skip: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24,
        position: 'absolute',
        right: Metrics.largeMargin,
        top: Metrics.screenHeight * 0.08,
        zIndex: 1
    }
})
