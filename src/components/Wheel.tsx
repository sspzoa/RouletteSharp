import React, {useRef, useState, FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface WheelProps {
  onWin?: (value: string) => void;
}

interface Slice {
  ratio: number;
  color: string;
  value: string;
}

const Wheel: FC<WheelProps> = ({onWin}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const startSpinning = () => {
    if (isSpinning) {
      return;
    }
    setIsSpinning(true);
    const rotations = Math.random() * 5 + 10;
    currentRotation.current += rotations;

    Animated.timing(spinValue, {
      toValue: currentRotation.current,
      duration: rotations * 1000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      const finalRotation = currentRotation.current % 1;
      let cumulativePercent = 0;
      for (const slice of slices) {
        const percent = slice.ratio / totalRatio;
        cumulativePercent += percent;
        if (cumulativePercent > finalRotation) {
          if (onWin) {
            onWin(slice.value);
          }
          setIsSpinning(false);
          break;
        }
      }
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const slices: Slice[] = [
    {ratio: 1, color: '#ECEE81', value: '1'},
    {ratio: 1, color: '#8DDFCB', value: '2'},
    {ratio: 1, color: '#82A0D8', value: '3'},
    {ratio: 1, color: '#EDB7ED', value: '4'},
  ];

  const totalRatio = slices.reduce((acc, slice) => acc + slice.ratio, 0);
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const wheel = slices.map(slice => {
    const percent = slice.ratio / totalRatio;
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
    cumulativePercent += percent;
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;
    const pathData = [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      'L 0 0', // Line
    ].join(' ');
    return <Path d={pathData} fill={slice.color} key={pathData} />;
  });

  return (
    <View style={styles.wheelArea}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <View style={styles.wheel}>
          <Svg
            height="550"
            width="550"
            viewBox="-1 -1 2 2"
            style={{transform: [{rotate: '-90deg'}]}}>
            {wheel}
          </Svg>
        </View>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={startSpinning}
          disabled={isSpinning}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wheel: {
    height: 550,
    width: 550,
    position: 'relative',
  },
  wheelArea: {
    backgroundColor: 'white',
    borderRadius: 500,
    width: 600,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonText: {
    color: 'skyblue',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Wheel;
