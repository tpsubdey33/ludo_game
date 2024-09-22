import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Wrapper from '../Component/Wrapper';
import MenuIcon from '../assets/images/menu.png';
import StartGame from '../assets/images/start.png';
import {deviceHeight, deviceWidth} from '../Constants/Scaling';
import Dice from '../Component/Dice';
import {Colors} from '../Constants/Colors';
import Poket from '../Component/Poket';
import VerticalPath from '../Component/Path/VerticalPath';
import {Plot1Data, Plot2Data, Plot3Data, Plot4Data} from '../Helpers/PlotData';
import HorizontalPath from '../Component/Path/HorizontalPath';
import FourTriangles from '../Component/FourTriangles';
import {useSelector} from 'react-redux';
import {
  selectDiceTouch,
  selectPlayer1,
  selectPlayer2,
  selectPlayer3,
  selectPlayer4,
} from '../redux/reducers/gameSelectors';
import {useIsFocused} from '@react-navigation/native';

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

  // useEffect(() => {
  //   if (isFocused) {
  //     setShowStartImage(true);
  //     const blinkAnimation = Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(opacity, {
  //           toValue: 0,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //         Animated.timing(opacity, {
  //           toValue: 1,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //       ]),
  //     );
  //     blinkAnimation.start();

  //     const timeout = setTimeout(() => {
  //       blinkAnimation.stop();
  //       setShowStartImage(false);
  //     }, 2500);
  //     return () => {
  //       blinkAnimation.stop();
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [isFocused]);

  return (
    <Wrapper>
      <TouchableOpacity style={{position: 'absolute', top: 60, left: 20}}>
        <Image source={MenuIcon} style={{height: 30, width: 30}} />
      </TouchableOpacity>
      {/* Ludo Board */}
      <View style={styles.container}>
        <View style={styles.flexRow} pointerEvents={isDiceTouch ? 'none' : 'auto'} >
          <Dice color={Colors.green} player={2} data={player2} />
          <Dice color={Colors.yellow} rotate player={3} data={player3} />
        </View>
        <View style={styles.ludoBoard}>
          <View style={styles.plotontainer}>
            <Poket color={Colors.green} player={2} data={player2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Poket color={Colors.yellow} player={3} data={player3} />
          </View>

          <View style={styles.patchContainer}>
            <HorizontalPath cells={Plot1Data} color={Colors.green} />
            <FourTriangles />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>

          <View style={styles.plotontainer}>
            <Poket color={Colors.red} player={1} data={player1} />
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Poket color={Colors.blue} player={4} data={player4} />
          </View>
        </View>

        <View style={styles.flexRow} pointerEvents={isDiceTouch ? 'none' : 'auto'} >
          <Dice color={Colors.red} player={1} data={player1} />
          <Dice color={Colors.blue} rotate player={4} data={player4} />
        </View>
      </View>

      {showStartImage && (
        <Animated.Image
          source={StartGame}
          style={{
            width: deviceWidth * 0.5,
            height: deviceHeight * 0.2,
            position: 'absolute',
            opacity,
          }}
        />
      )}
    </Wrapper>
  );
};

export default LudoboardScreen;

const styles = StyleSheet.create({
  container: {
    height: deviceHeight * 0.5,
    width: deviceWidth,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  ludoBoard: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    padding: 10,
  },
  plotontainer: {
    width: '100%',
    height: '40%',
    backgroundColor: '#ccc',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  patchContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    backgroundColor: '#1E5162',
  },
});
