import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Wrapper from '../components/Wrapper';
import MenuIcon from '../assets/images/menu.png';
import {deviceHeight, deviceWidth} from '../constants/Scaling';
import Dice from '../components/Dice';
import {Colors} from '../constants/Colors';
import Pocket from '../components/Pocket';
import {Plot1Data, Plot2Data, Plot3Data, Plot4Data} from '../helpers/PlotData';
import VerticalPath from '../components/path/VerticalPath';
import HorizontalPath from '../components/path/HorizontalPath';
import FourTriangles from '../components/FourTriangles';
import {useSelector} from 'react-redux';
import {
  selectDiceTouch,
  selectPlayer1,
  selectPlayer2,
  selectPlayer3,
  selectPlayer4,
} from '../redux/reducers/gameSelectors';
import {useIsFocused} from '@react-navigation/native';

import SartGame from '../assets/images/start.png';
import MenuModel from '../components/MenuModel';
import {playSound} from '../helpers/SoundUtility';
import WinModal from '../components/WinModal';

const LudoboardScreen = () => {
  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);

  const isDiceTouch = useSelector(selectDiceTouch);
  const winner = useSelector(state => state.game.winner);

  const isFocused = useIsFocused();
  const [showStartImage, setShowStartImage] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(()=>{
      if(isFocused){
          setShowStartImage(true);
          const blinkAnimation=Animated.loop(
              Animated.sequence([
                  Animated.timing(opacity,{
                      toValue:0,
                      duration:500,
                      useNativeDriver:true,
                  }),
                  Animated.timing(opacity,{
                      toValue:1,
                      duration:500,
                      useNativeDriver:true,
                  }),
              ])
          )
          blinkAnimation.start()
          const timeout=setTimeout(()=>{
              blinkAnimation.stop();
              setShowStartImage(false);
          },2500)
          return()=>{
              blinkAnimation.stop()
          }
      }
  },[isFocused])
  const handleMenuPress = useCallback(() => {
    playSound('ui');
    setMenuVisible(true);
  }, [menuVisible]);

  return (
    <Wrapper>
      <TouchableOpacity
        onPress={handleMenuPress}
        style={{position: 'absolute', top: 60, left: 20}}>
        <Image source={MenuIcon} style={{width: 30, height: 30}} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View
          style={styles.flexRow}
          pointerEvents={isDiceTouch ? 'none' : 'auto'}>
          <Dice color={Colors.green} player={2} data={player2} />
          <Dice color={Colors.yellow} rotate data={player3} player={3} />
        </View>
        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} data={player2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3} data={player3} />
          </View>
          <View style={styles.pathContainer}>
            <HorizontalPath cells={Plot1Data} color={Colors.green} />
            <FourTriangles
              player1={player1}
              player2={player2}
              player3={player3}
              player4={player4}
            />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} data={player1} />
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} data={player4} />
          </View>
        </View>
        <View
          style={styles.flexRow}
          pointerEvents={isDiceTouch ? 'none' : 'auto'}>
          <Dice color={Colors.red} player={1} data={player1} />
          <Dice color={Colors.blue} rotate player={4} data={player4} />
        </View>
      </View>
      {showStartImage && (
        <Animated.Image
          source={SartGame}
          style={{
            width: deviceWidth * 0.5,
            height: deviceWidth * 0.2,
            position: 'absolute',
            opacity,
          }}
        />
      )}

      {menuVisible && (
        <MenuModel
          onPressHide={() => setMenuVisible(false)}
          visible={menuVisible}
        />
      )}
      {winner != null && <WinModal winner={winner} />}
    </Wrapper>
  );
};

export default LudoboardScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: deviceHeight * 0.5,
    width: deviceWidth,
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  ludoBoard: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    padding: 10,
    //backgroundColor:"red"
  },
  plotContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
  pathContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    backgroundColor: '#1E5162',
  },
});
