import { DUMMY_DATA } from "../../constants/dummyData";
import { PLAYED_DURATION, VIDEO_DURATION } from "../actionTypes/actionType";

const initialState = {
  dummyData: DUMMY_DATA
};

export default function MainReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case PLAYED_DURATION:
      return  {
        ...state,
        dummyData: [...state.dummyData.map((val, idx) => {
          if (action.payload.data.id === val.id) {
            return {
              ...val,
              playlist: val.playlist.map((innerLoop) => {
                if (innerLoop.id === 1) {
                  return {
                    ...innerLoop,
                    completed: action.payload.currentTime,
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
          if (action.payload.data.id === val.id) {
            return {
              ...val,
              playlist: val.playlist.map((innerLoop) => {
                if (innerLoop.id === 1) {
                  return {
                    ...innerLoop,
                    duration: action.payload.totalDuration,
                  }
                }
                return innerLoop
              })
            }
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
