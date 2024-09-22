import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Colors} from '../../Constants/Colors';
import Pile from '../Pile';
import {ArrowSpot, SafeSpots, StarSpots} from '../../Helpers/PlotData';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentPostions} from '../../redux/reducers/gameSelectors';
import { handleForwardThunk } from '../../redux/reducers/gameAction';

const rotationMap = {
  38: '180deg',
  25: '90deg',
  51: '-90deg',
};

const Cell = ({id, color}) => {
  const dispatch = useDispatch();
  const plottedPieces = useSelector(selectCurrentPostions);

  const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id]);
  const isStarSpot = useMemo(() => StarSpots.includes(id), [id]);
  const isArrowSpot = useMemo(() => ArrowSpot.includes(id), [id]);

  const peicesAtPosition = useMemo(
    () => plottedPieces.filter(item => item.pos == id),
    [plottedPieces, id],
  );

  const handlePress = useCallback(
    (playerNo, pieceId) => {
      dispatch(handleForwardThunk(pieceId, playerNo, id));
    },
    [dispatch, id],
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSafeSpot ? color : '#FFFFFF',
        },
      ]}>
      {isStarSpot && <Feather name="star" color="gray" size={20} />}
      {isArrowSpot && (
        <AntDesign
          name="arrowright"
          size={20}
          style={{
            transform: [{rotate: rotationMap[id] || '0deg'}],
          }}
        />
      )}

      {peicesAtPosition?.map((piece, index) => {
        const playerNo =
          piece.id[0] === 'A'
            ? 1
            : piece.id[0] === 'B'
            ? 2
            : piece.id[0] === 'C'
            ? 3
            : 4;
        const pieceColor =
          playerNo == 1
            ? Colors.red
            : playerNo == 2
            ? Colors.green
            : playerNo == 3
            ? Colors.yellow
            : Colors.blue;
        return (
          <View
            key={piece.id}
            style={[
              styles.pieceContainer,
              {
                transform: [
                  {
                    scale: peicesAtPosition.length === 1 ? 1 : 0.7,
                  },
                  {
                    translateX:
                      peicesAtPosition.length === 1
                        ? 0
                        : index % 2 === 0
                        ? -6
                        : 6,
                  },
                  {
                    translateY:
                      peicesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6,
                  },
                ],
              },
            ]}>
            <Pile
              cell={true}
              player={playerNo}
              onPress={() => handlePress(playerNo, piece.id)}
              pieceId={piece.id}
              color={pieceColor}
            />
          </View>
        );
      })}
      {/* <Text>{id}</Text> */}
    </View>
  );
};

export default React.memo(Cell);

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    borderColor: Colors.borderColor,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieceContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 99,
  },
});
