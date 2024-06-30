export function sumPlaylistDuration(playlist) {
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

export function sumPlaylistDurationWatched(playlist) {
    const totalDurationInSeconds = playlist.reduce((total, video) => total + video.duration, 0);
    const totalDurationWatchedInSeconds = playlist.reduce((total, video) => total + video.completed, 0);
    return Math.floor(totalDurationWatchedInSeconds / totalDurationInSeconds * 100)
}
