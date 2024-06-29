import { Slider } from 'native-base';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VideoController = ({ duration, currentTime=0, onSeek, onPlayPause, isPlaying,muted ,toggleMute,toggleFullscreen,fullscreen }) => {

  const seekForward = () => {
    onSeek(Math.min(currentTime + 10, duration));
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={onPlayPause}>
          <Icon name={isPlaying ? "pause" : "play-arrow"} size={24} color="#6e6a6a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={seekForward}>
          <Icon name="forward-10" size={24} color="#6e6a6a" />
        </TouchableOpacity>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
          <Slider
            value={duration && currentTime ? currentTime : 0}
            minValue={0}
            maxValue={duration}
            onChange={(v) => onSeek(v)}
            step={0.1}
            size="sm"
            width="70%"
            marginX={2}
            colorScheme={"blue"}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Icon name="closed-caption" size={24} color="#6e6a6a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleMute}>
          <Icon name={muted ? "volume-off" : "volume-up"} size={24} color="#6e6a6a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleFullscreen}>
          <Icon name={fullscreen ? "fullscreen-exit" : "fullscreen"} size={24} color="#6e6a6a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="settings" size={24} color="#6e6a6a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 4,
  },
  time: {
    color: '#6e6a6a',
    fontSize: 10,
    paddingHorizontal: 4,
  },
  slider: {
    flex: 1,
    height: 40,
  },
});

export default VideoController;
