import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, StatusBar } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { Box, Progress } from 'native-base';
import { navigationRef } from '../../navigations/mainNavigation'
import { useSelector } from 'react-redux'

const renderItem = ({ item }) => {
    const duration = sumPlaylistDuration(item.playlist);

    let timeLeftText = "Start Course";

    if (duration.hours > 0 || duration.minutes > 0 || duration.seconds > 0) {
        timeLeftText = `${duration.hours > 0 ? duration.hours + 'h ' : ''}${duration.minutes > 0 ? duration.minutes + 'm ' : ''}${duration.seconds > 0 ? duration.seconds + 's ' : ''}Learning left`;
    }
    return (
        (
            <View style={styles.itemProgress}>
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {
                    navigationRef.navigate("VideoPlayerScreen", {
                        ...item
                    })
                }}>
                    <View style={{ width: 110, height: 120, borderRadius: 10, overflow: "hidden" }}>
                        <Image source={{ uri: item.imageUrl }} style={{ height: 120, width: 110, objectFit: "cover" }} />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <Text style={{ fontSize: 18 }}>{item.courseName}</Text>
                        {
                            !isNaN(sumPlaylistDurationWatched(item.playlist)) ? <>
                                <Text style={{ color: "blue", marginTop: 5 }}>{timeLeftText}</Text>

                                {/* <Text style={{ color: "blue", marginTop: 5 }}>{`${sumPlaylistDuration(item.playlist).hours}h ${sumPlaylistDuration(item.playlist).minutes > 0 ? sumPlaylistDuration(item.playlist).minutes + "m Learning left" : "Learning left"}`}</Text> */}
                                <Box w="100%" mt={6} >
                                    <Progress value={sumPlaylistDurationWatched(item.playlist)} colorScheme="primary" />
                                </Box>
                                <Text style={{ fontSize: 18 }}>{sumPlaylistDurationWatched(item.playlist)}%</Text>
                            </>
                                :
                                <Text style={{ fontSize: 18, color: "green" }}>Start Course</Text>

                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    )
};

const renderItemRecentlyCompleted = ({ item }) => (
    <View style={styles.item}>
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {
            navigationRef.navigate("VideoPlayerScreen", {
                ...item
            })
        }} >
            <View style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden" }}>
                <Image source={{ uri: item.imageUrl }} style={{ height: 60, width: 60, objectFit: "cover" }} />
            </View>
            <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 18 }}>{item.courseName}</Text>
                <Text style={{ color: "green", marginTop: 5, textAlignVertical: "center" }}>{`completed`} <AntDesign name={"checkcircle"} size={14} color="green" /></Text>
            </View>
        </TouchableOpacity>
    </View>
);

const renderItemVertical = ({ item }) => {
    const duration = sumPlaylistDuration(item.playlist);

    let timeLeftText = "Start Course";

    if (duration.hours > 0 || duration.minutes > 0 || duration.seconds > 0) {
        timeLeftText = `${duration.hours > 0 ? duration.hours + 'h ' : ''}${duration.minutes > 0 ? duration.minutes + 'm ' : ''}${duration.seconds > 0 ? duration.seconds + 's ' : ''}Learning left`;
    }
    return (
        (

            <View style={styles.itemVertical}>
                <TouchableOpacity disabled={!item.isFree} style={{ flexDirection: "row", alignItems: "flex-start",opacity: !item.isFree? 0.5 : 1 }} onPress={() => {
                    navigationRef.navigate("VideoPlayerScreen", {
                        ...item
                    })
                }}>
                    <View style={{ width: 90, height: 90, borderRadius: 10, overflow: "hidden" }}>
                        <Image source={{ uri: item.imageUrl }} style={{ height: 90, width: 90, objectFit: "cover" }} />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <Text style={{ fontSize: 18 }}>{item.courseName}</Text>
                        {item.isFree ?
                            <>
                                {
                                    !isNaN(sumPlaylistDurationWatched(item.playlist)) ? <>
                                        <Text style={{ color: "blue", marginTop: 5 }}>{timeLeftText}</Text>
                                        <Box w="100%" mt={6} >
                                            <Progress value={sumPlaylistDurationWatched(item.playlist)} colorScheme="primary" />
                                        </Box>
                                    </>
                                        :
                                        <Text style={{ fontSize: 18, color: "green" }}>Start Course</Text>

                                }
                            </>
                            :
                            <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                                <SimpleLineIcons name="lock" size={18} />
                                <Text style={{ fontSize: 16, marginLeft: 8 }}>Locked</Text>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    )
};

function sumPlaylistDuration(playlist) {
    if (playlist.reduce((total, video) => total + video.completed, 0) === 0) {
        const totalDurationInSeconds = playlist.reduce((total, video) => total + video.duration, 0) - playlist.reduce((total, video) => total + video.completed, 0);
        return {
            hours: Math.floor(totalDurationInSeconds / 3600),
            minutes: Math.floor((totalDurationInSeconds % 3600) / 60),
            seconds: Math.floor(totalDurationInSeconds % 60)

        }
    }
    const totalDurationInSeconds = playlist.reduce((total, video) => total + video.duration, 0) - playlist.reduce((total, video) => total + video.completed, 0);
    // const totalDurationWatchedInSeconds = playlist.reduce((total, video) => total + video.completed, 0);
    const hours = Math.floor(totalDurationInSeconds / 3600);
    const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
    const seconds = Math.floor(totalDurationInSeconds % 60);

    return { hours, minutes, seconds };
}

function sumPlaylistDurationWatched(playlist) {
    const totalDurationInSeconds = playlist.reduce((total, video) => total + video.duration, 0);
    const totalDurationWatchedInSeconds = playlist.reduce((total, video) => total + video.completed, 0);
    return Math.floor(totalDurationWatchedInSeconds / totalDurationInSeconds * 100)
}

const DashboardScreen = ({ navigation }) => {

    const dummyData = useSelector(state => state.mainReducer.dummyData)
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={"black"}
            />
            <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10, paddingHorizontal: 20, paddingTop: 20 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ marginRight: 10 }}>
                    <Ionicons name="arrow-back" size={18} color="black" />
                </TouchableOpacity>
                <Text>Back to Dashbard</Text>
            </View>
            {dummyData.filter((val) => {
                return val.playlist.reduce((total, video) => total + video.completed, 0)
            })[0] && <View style={{
                flex: dummyData.filter((val) => {
                    return val.playlist.reduce((total, video) => total + video.duration, 0) === val.playlist.reduce((total, video) => total + video.completed, 0)
                })[0] ? 2 : 1
            }}>
                    <Text style={{ ...styles.heading, fontSize: 16, color: "#5699e8", backgroundColor: "#e5eefa", width: 120, textAlign: "center", padding: 3, borderRadius: 10 }}>In Progress</Text>
                    <FlatList
                        data={dummyData.filter((val) => {
                            return val.playlist.reduce((total, video) => total + video.completed, 0)
                        })}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ padding: 10 }} />}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        style={{
                            flexGrow: 0,
                            height: 400,
                            marginBottom: 10,
                        }}
                    />
                    {
                        dummyData.filter((val) => {
                            return val.playlist.reduce((total, video) => total + video.duration, 0) === val.playlist.reduce((total, video) => total + video.completed, 0)
                        })[0] && <>
                            <Text style={styles.heading}>Recent Completed</Text>
                            <FlatList
                                data={dummyData.filter((val) => {
                                    if (val.playlist.reduce((total, video) => total + video.duration, 0) !== 0) {
                                        return val.playlist.reduce((total, video) => total + video.duration, 0) === (val.playlist.reduce((total, video) => total + video.completed, 0))
                                    }
                                    return false
                                })}
                                renderItem={renderItemRecentlyCompleted}
                                horizontal
                                ItemSeparatorComponent={() => <View style={{ padding: 10 }} />}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                showsHorizontalScrollIndicator={false}
                                style={styles.horizontalList}
                            />
                        </>
                    }
                </View>}
            <View style={{
                flex: dummyData.filter((val) => {
                    return val.playlist.reduce((total, video) => total + video.duration, 0) === val.playlist.reduce((total, video) => total + video.completed, 0)
                })[0] ? 1.5 : 2, backgroundColor: "white", padding: 20
            }}>
                <Text style={styles.heading}>Upcoming Modules</Text>
                <FlatList
                    data={dummyData}
                    renderItem={renderItemVertical}
                    showsVerticalScrollIndicator={false}
                    style={styles.verticalList}
                />
            </View>
        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 20
    },
    horizontalList: {
        flexGrow: 0,
        height: 250,
        marginBottom: 10,
    },
    verticalList: {
        flex: 1,
    },
    itemProgress: {
        height: 150,
        backgroundColor: 'white',
        marginVertical: 8,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    item: {
        backgroundColor: 'white',
        paddingRight: 20,
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    itemVertical: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: {
        fontSize: 16,
    },
});