import { PLAYED_DURATION, VIDEO_DURATION,CURRENTLY_WATCHING } from "../actionTypes/actionType"

export const playedDuration = (data) =>{
    return {
        type: PLAYED_DURATION,
        payload:data
    }
}

export const playDuration = (data) =>{
    return {
        type: VIDEO_DURATION,
        payload:data
    }
}

export const currentlyWatching = (data) =>{
    return {
        type: CURRENTLY_WATCHING,
        payload:data
    }
}