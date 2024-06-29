import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle as Cir } from 'react-native-svg';

const Circle = ({ size, borderWidth, borderColor, percentage }) => {
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} color={"transparent"}>
        {/* Background Circle */}
        <Cir
          cx={radius}
          cy={radius}
          r={radius - borderWidth / 2}
          stroke="white"
          fill={"transparent"}
          strokeWidth={borderWidth}
        />
        {/* Colored Circle */}
        <Cir
          cx={radius}
          cy={radius}
          r={radius - borderWidth / 2}
          stroke={borderColor}
          fill="transparent"
          strokeWidth={borderWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Circle;
