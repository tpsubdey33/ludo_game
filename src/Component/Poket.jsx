import {StyleSheet, Text, View} from 'react-native';
import React, {memo, startTransition} from 'react';
import {Colors} from '../Constants/Colors';
import Pile from './Pile';
import {useDispatch} from 'react-redux';
import {
  unfreezeDice,
  updateDiceNo,
  updatePlayerChance,
  updatePlayerPieceValue,
} from '../redux/reducers/gameSlice';
import { startingPoints } from '../Helpers/PlotData';

const Poket = memo(({color, player, data}) => {
  // console.log('Poket');

  const dispatch = useDispatch();

  const handlePress = async value => {
    let playerNo = value?.id[0];
    console.log(playerNo);

    switch (playerNo) {
      case 'A':
        playerNo = 'player1';
        break;
      case 'B':
        playerNo = 'player2';
        break;
      case 'C':
        playerNo = 'player3';
        break;
      case 'D':
        playerNo = 'player4';
        break;
    }
    dispatch(
      updatePlayerPieceValue({
        playerNo: playerNo,
        pieceId: value.id,
        pos: startingPoints[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
        travelCount: 1,
      }),
    );
    dispatch(
      unfreezeDice(),
    );
    
  };

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.childFrame}>
        <View style={styles.flexRow}>
          <Plot
            pieceNo={0}
            player={player}
            data={data}
            onPress={handlePress}
            color={color}
          />
          <Plot
            pieceNo={1}
            player={player}
            data={data}
            onPress={handlePress}
            color={color}
          />
        </View>
        <View style={[styles.flexRow, {marginTop: 20}]}>
          <Plot
            pieceNo={2}
            player={player}
            data={data}
            onPress={handlePress}
            color={color}
          />
          <Plot
            pieceNo={3}
            player={player}
            data={data}
            onPress={handlePress}
            color={color}
          />
        </View>
      </View>
    </View>
  );
});

const Plot = ({pieceNo, color, player, data, onPress}) => {
  return (
    <View style={[styles.plot, {backgroundColor: color}]}>
      {data && data[pieceNo]?.pos === 0 && (
        <Pile
          color={color}
          player={player}
          onPress={() => onPress(data[pieceNo])}
        />
      )}
    </View>
  );
};

export default Poket;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },
  childFrame: {
    backgroundColor: '#FFFFFF',
    height: '70%',
    width: '70%',
    borderColor: Colors.borderColor,
    padding: 15,
    borderWidth: 0.4,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100$',
    height: '40%',
  },
  plot: {
    height: '80%',
    width: '36%',
    borderRadius: 120,
  },
});
