import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Circle from './circle';
import { useSelector } from 'react-redux';

const transformData = (inputData) => {
  return inputData.map(item => {
    let newData = {
      title: item.title,
      icon: ""
    };

    if (item.duration && item.completed > item.duration - 2) {
      newData.icon = <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent"
      }}>
        <AntDesign name="check" size={14} color="white" />
      </View>
      newData.circleColor = '#009688'
      newData.lineColor = '#009688'
    } else if (item.duration && item.completed === 0) {
      newData.icon = <Icon name="lock" size={14} color="white" />
      newData.circleColor = 'grey'
      newData.lineColor = '#009688'
    } else {
      newData.circleColor = 'grey'
      newData.lineColor = '#009688'
      newData.icon = <Circle size={30} borderWidth={4} borderColor='green' percentage={item.completed / item.duration * 100} />
    }
    return newData;
  });
};

const Accordion = ({ title, leftIconName, listData }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const dummyData = useSelector(state => state.mainReducer.dummyData)


  const toggleAccordion = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // Adjust this value based on content
    extrapolate: 'clamp',
  });

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={toggleAccordion} style={styles.titleContainer}>
        <Icon name={leftIconName} size={24} color="#0d6ddf" style={styles.leftIcon} />
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <MaterialIcons name="expand-more" size={28} color="#0d6ddf" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={{ ...styles.contentContainer  }}>
        {expanded && <View>
          <View style={styles.containerTimeline}>
            <Timeline
              style={styles.list}
              data={transformData(dummyData.filter(val => val.id === listData.id)[0].playlist)}
              circleSize={30}
              dotSize={18}
              circleColor='rgb(45,156,219)'
              timeContainerStyle={{ minWidth: 0, marginTop: -5 }} // Adjusted to remove the time container space
              timeStyle={{ display: 'none' }} // Hide the time display
              descriptionStyle={{ color: 'gray' }}
              rowContainerStyle={{ paddingVertical: -5 }}
              options={{
              }}
              innerCircle={'icon'}
            />
          </View>
        </View>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 10,
    paddingHorizontal: 15,
    backgroundColor: "#e5eefa"
  },
  containerTimeline: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e5eefa'
  },
  list: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: '#e5eefa',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcon: {
    marginRight: 10,
  },
  title: {
    color: '#0d6ddf',
    fontSize: 18,
    flex: 1,
  },
  contentContainer: {
    overflow: 'hidden',
  },
});

export default React.memo(Accordion);
