import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Wheel from '../components/Wheel';
import PopUp from '../components/PopUp'; // PopUp 컴포넌트를 임포트합니다.

function Main({navigation}: {navigation: any}) {
  const [winner, setWinner] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleWin = (value: string) => {
    setWinner(value);
    setShowModal(true);
  };

  const closePopup = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Wheel onWin={handleWin} />
      <PopUp winner={winner} isVisible={showModal} onClose={closePopup} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
