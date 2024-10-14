import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import Modal from 'react-native-modal';
import GradientButton from './GradientButton';
import {useDispatch} from 'react-redux';
import {announceWinner, resetGame} from '../redux/reducers/gameSlice';
import {playSound} from '../helpers/SoundUtility';
import {goBack} from '../helpers/NavigationUtils';
import LinearGradient from 'react-native-linear-gradient';

const MenuModel = ({visible, onPressHide}) => {
  const dispatch = useDispatch();
  
  const handleNewGame = useCallback(() => {
    dispatch(resetGame());
    playSound('game_start');
    dispatch(announceWinner(null));
    onPressHide();
  }, [dispatch, onPressHide]);

  const handleHome = useCallback(() => {
    goBack();
  }, []);

  return (
    <Modal
      style={styles.bottomModalView}
      isVisible={visible}
      backdropColor="black"
      backdropOpacity={0.8}
      onBackdropPress={onPressHide}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={onPressHide}>
      <View style={styles.modalContainer}>
        <View style={styles.subView}>
          <GradientButton title="RESUME" onPress={onPressHide} />
          <GradientButton title="NEW GAME" onPress={handleNewGame} />
          <GradientButton title="HOME" onPress={handleHome} />
        </View>
      </View>
    </Modal>
  );
};

export default MenuModel;

const styles = StyleSheet.create({
  bottomModalView: {
    justifyContent: 'center',
    width: '95%',
    alignSelf: 'center',
  },
  gradientContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    paddingVertical: 40,
    width: '96%',
    borderWidth: 2,
    borderColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
