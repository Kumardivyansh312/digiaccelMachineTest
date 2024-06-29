import { combineReducers } from "redux";
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainReducer from "./mainReducer";

const mainPersist = {
  key: 'mainPersist',
  storage: AsyncStorage,
}

export default combineReducers({
  mainReducer:persistReducer(mainPersist,MainReducer),
});