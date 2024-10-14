import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import LottieView from 'lottie-react-native'
import GradientButton from './GradientButton'
import Pile from './Pile'
import { announceWinner,resetGame } from '../redux/reducers/gameSlice'
import { playSound } from '../helpers/SoundUtility'
import { resetAndNavigate } from '../helpers/NavigationUtils'
import { colorPlayer } from '../helpers/PlotData'
import HeartGirl from '../assets/animation/girl.json'
import Trophy from '../assets/animation/trophy.json'
import FireWorks from '../assets/animation/firework.json'
const WinModal = ({winner}) => {
    const dispatch =useDispatch();
    const [visible,setVisible]=useState(!!winner);
    useEffect(()=>{
        setVisible(!!winner);

    },[winner]);
    const handleNewGame=()=>{
        dispatch(resetGame());
        dispatch(announceWinner(null));
        playSound('game_start');
    }
    const handleHome=()=>{
        dispatch(resetGame());
        dispatch(announceWinner(null));
        resetAndNavigate('HomeScreen')
    }
  return (
    <Modal
    style={styles.modal}
    isVisible={visible}
    backdropColor='black'
    backdeopOpacity={0.8}
    onBackdropPress={()=>{}}
    animationIn="zoomIn"
    animationOut='zoomOut'
    onBackButtonPress={()=>{}}
    >
        <LinearGradient
        colors={['#0f0c29','#303b63','#24243e']}
        style={styles.gradientContainer}
        >
            <View style={styles.content}>
                <View
                style={styles.pileContainer}
                >
                    <Pile player={1} color={colorPlayer[winner-1]}/>
                </View>
                <Text style={styles.congratsText}>
                    Congratulations!PLAYER {winner}
                </Text>
                <LottieView
                autoPlay
                hardwareAccelerationAndroid
                loop={false}
                source={Trophy}
                style={styles.trophyAnimation}
                />
                <LottieView
                    autoPlay
                    hardwareAccelerationAndroid
                    loop={true}
                    source={FireWorks}
                    style={styles.fireworkAnimation}
                    />
                    <GradientButton title="NEW GAME" onPress={handleNewGame}/>
                    <GradientButton title="HOME" onPress={handleHome}/>
            </View>
        </LinearGradient>
        <LottieView
        hardwareAccelerationAndroid
        autoPlay
        loop={true}
        source={HeartGirl}
        style={styles.girlAnimation}
        />
    </Modal>
  )
}

export default WinModal

const styles = StyleSheet.create({
    modal:{
        justifyContent:'center',
        alignItems:'center',
    },
    gradientContainer:{
        borderRadius:20,
        padding:20,
        width:'96%',
        borderWidth:2,
        borderColor:'gold',
        justifyContent:'center',
        alignItems:'center',
    },
    content:{
        width:'100%',
        alignItems:'center',
    },
    pileContainer:{
        width:90,
        height:40,

    },
    congratsText:{
        fontSize:18,
        color:'white',
        fontFamily:'Philosohper-Bold',
        marginTop:10,
    },
    trophyAnimation:{
        height:200,
        width:200,
        marginTop:20,
    },
    fireworkAnimation:{
        height:200,
        width:500,
        position:'absolute',
        zIndex:-1,
        marginTop:20,
    },
    girlAnimation:{
        height:500,
        width:300,
        position:'absolute',
        bottom:-200,
        right:-120,
        zIndex:99,
        }
})