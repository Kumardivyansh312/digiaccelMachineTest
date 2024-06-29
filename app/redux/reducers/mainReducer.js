import { DUMMY_DATA } from "../../constants/dummyData";
import { CURRENTLY_WATCHING, PLAYED_DURATION, VIDEO_DURATION } from "../actionTypes/actionType";

const initialState = {
  dummyData: DUMMY_DATA
};

export default function MainReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case PLAYED_DURATION:
      return {
        ...state,
        dummyData: [...state.dummyData.map((val, idx) => {
          if (payload.data.id === val.id) {
            return {
              ...val,
              playlist: val.playlist.map((innerLoop) => {
                if (innerLoop.id-1 === val.currentlyWatching) {
                  return {
                    ...innerLoop,
                    completed: payload.currentTime,
                  }
                }
                return innerLoop
              })
            }
          }
          return val
        })]
      }
    case VIDEO_DURATION:
      return {
        ...state,
        dummyData: [...state.dummyData.map((val, idx) => {
          console.log("Singl 1")
          if (payload.data.id === val.id) {
            console.log("Sing 2")
            return {
              ...val,
              playlist: val.playlist.map((innerLoop) => {
                console.log("Singl")
                if (innerLoop.id-1 === val.currentlyWatching) {
                  console.log("123213")
                  return {
                    ...innerLoop,
                    duration: payload.totalDuration,
                  }
                }
                return innerLoop
              })
            }
          }
          return val
        })]
      }
    case CURRENTLY_WATCHING:
      return {
        ...state,
        dummyData: [...state.dummyData.map((val, idx) => {
          if (payload.data.id === val.id) {
            return { ...val, currentlyWatching: payload.currentlyWatching }
          }
          return val
        })]
      }
    default:
      return {
        ...state,
      };
  }
}
