import React, { useRef, useState, useCallback } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Video from 'react-native-video';
import VideoController from '../../components/videoController';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { playDuration, playedDuration } from '../../redux/actions/mainActions';
import { styles } from './Styles';

const VideoPlayerAloneScreen = ({ navigation, route }) => {
    // Retrieve video details from route params
    const videoContent = route.params;
    const videoRef = useRef();
    const [currentlyWatch] = useState(videoContent.currentlyWatching ? videoContent.currentlyWatching : 0);
    const [currentTime, setCurrentTime] = useState(route.params.currentTime);
    const [duration, setDuration] = useState(route.params.duration);
    const [isPlaying, setIsPlaying] = useState(route.params.isPlaying);
    const [muted, setMuted] = useState(route.params.muted);
    const [showController, setShowController] = useState(false);
    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            if (isFocused) {
                if (videoRef.current && currentTime) {
                    videoRef.current.seek(currentTime); // Seek to the specified currentTime
                }
            }
        }, [])
    )

    const translateY = useRef(new Animated.Value(0)).current;

    // Function to toggle full-screen mode
    const toggleFullScreen = () => {
        navigation.goBack(); // Navigate back to previous screen
    };

    // Function to handle seek in the video
    const handleSeek = (time) => {
        videoRef.current.seek(time);
        setCurrentTime(time);
    };

    // Function to handle play/pause of the video
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying); // Toggle play/pause state
    };

    // Function to update current time during playback
    const onPlayerProgress = (progress) => {
        setCurrentTime(progress.currentTime);
        dispatch(playedDuration({ currentTime: progress.currentTime, data: videoContent }));

    };

    // Function to toggle video controller visibility with smooth animation
    const toggleController = () => {
        Animated.timing(translateY, {
            toValue: showController ? 0 : 100,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setShowController(!showController);
    };

    return (
        <View style={styles.container}>
            {/* Video Container */}
            <TouchableOpacity
                style={[styles.videoContainer, styles.fullScreenVideo]}
                onPress={toggleController} // Show controller on tap
                activeOpacity={1} // Disable tap feedback
            >
                {/* Video Component */}
                <Video
                    source={{ uri: videoContent.playlist[videoContent.currentlyWatching].videoUrl }}
                    controls={false} // Controls managed by VideoController component
                    paused={!isPlaying} // Ensure proper handling of play/pause state
                    pictureInPicture={true}
                    playInBackground={true}
                    muted={muted}
                    ref={videoRef}
                    onLoadStart={() => {
                        if (videoContent.playlist[currentlyWatch]?.completed > 0 && videoContent.playlist[currentlyWatch]?.completed !== videoContent.playlist[currentlyWatch]?.duration) {
                            videoRef.current.seek(videoContent.playlist[currentlyWatch]?.completed)
                        }else{
                            videoRef.current.seek(0)
                        }
                    }}
                    onLoad={(value) => {
                        dispatch(playDuration({ totalDuration: value.duration, data: videoContent }));
                        setDuration(value.duration);
                    }}
                    onEnd={() => {
                        if (currentlyWatch < videoContent.playlist.length) {
                            // dispatch(currentlyWatching({ currentlyWatching: currentlyWatch + 1, data: videoContent }));
                            // setCurrentlyWatch(prev => prev + 1)
                            // playNextVideo()
                        }
                    }}
                    onProgress={onPlayerProgress}
                    onError={(error) => console.log("Video Player Error: ", error)} // Log any errors
                    style={styles.backgroundVideo}
                />
            </TouchableOpacity>

            {/* Video Controller */}
            <Animated.View style={[styles.controller, { transform: [{ translateY }] }]}>
                <VideoController
                    duration={duration}
                    currentTime={currentTime}
                    muted={muted}
                    fullscreen={true} // Not in fullscreen mode here
                    toggleFullscreen={toggleFullScreen}
                    onSeek={handleSeek}
                    toggleMute={() => setMuted(!muted)}
                    onPlayPause={handlePlayPause}
                    isPlaying={isPlaying}
                />
            </Animated.View>
        </View>
    );
};



export default VideoPlayerAloneScreen;
