import { Animated, Easing, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { BackgroundImage } from '../helpers/GetIcons'
import {Svg,Circle} from 'react-native-svg'
import { useSelector } from 'react-redux'
import { selectCellSelection, selectDiceNo, selectPocketPileSelection } from '../redux/reducers/gameSelectors'
const Pile = ({color,cell,player,onPress,pieceId}) => {
  const rotation=useRef(new Animated.Value(0)).current;
  const currentPlayerPileSelection=useSelector(selectPocketPileSelection);
  const currentPlayerCellSelection=useSelector(selectCellSelection);
  const diceNo=useSelector(selectDiceNo);
  const playerPieces=useSelector(state=>state.game[`player${player}`]);

  const isPileEnabled=useMemo(()=>player===currentPlayerPileSelection,
[player,currentPlayerPileSelection],
)
  const isCellEnabled=useMemo(()=>player===currentPlayerCellSelection,
[player,currentPlayerCellSelection],
)

const isForwardable=useCallback(()=>{
  const piece=playerPieces?.find(item=>item.id===pieceId)
  return piece && piece.travelCount +diceNo <=57;
},[playerPieces,pieceId,diceNo]);
    const pileImage=BackgroundImage.GetImage(color);
    useEffect(()=>{
      const rotateAnimation=Animated.loop(
        Animated.timing(rotation,{
          toValue:1,
          duration:1000,
          easing:Easing.linear,
          useNativeDriver:true,
        })
      )
      rotateAnimation.start();
      return()=>rotateAnimation.stop();
    },[rotation]);
    const rotateInterpolate=useMemo(()=>rotation.interpolate({
      inputRange:[0,1],
      outputRange:['0deg','360deg']
    }),[rotation])

  return (
    <TouchableOpacity style={styles.container}
    activeOpacity={0.5}
    disabled={!(cell?isCellEnabled && isForwardable():isPileEnabled)}
    onPress={onPress}
    >
      <View style={styles.hallowCircle}>
        {(cell?isCellEnabled && isForwardable():isPileEnabled)&&
          (
            <View style={styles.dashedCircleContainer}>
          <Animated.View 
          style={[
            styles.dashedCircle,
            {transform:[{rotate:rotateInterpolate}]},
            ]}>
            <Svg height='18' width='18'>
              <Circle
              cx='9'
              cy='9'
              r='8'
              stroke='white'
              strokeWidth='2'
              strokeDasharray='4 4'
              strokeDashoffset='0'
              fill='transparent'
              />

            </Svg>
          </Animated.View>
        </View>
          )
        }
      
      </View>
        <Image source={pileImage}
         style={{width:32,height:32,position:'absolute',top:-16}}/>
    </TouchableOpacity>
  )
}

export default Pile

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        alignSelf:'center',
    },
    hallowCircle:{
      width:15,
      height:15,
      position:'absolute',
      borderRadius:25,
      borderWidth:2,
      borderColor:'black',
      justifyContent:'center',
      alignItems:'center',
    }
})