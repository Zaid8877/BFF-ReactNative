import { createStore } from "redux";
import reducers from "../Store/reducers";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import SplashScreen from 'react-native-splash-screen'

//REDUX SETUP

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    {}
);
const persistor = persistStore(store, {}, () => {
    SplashScreen.hide();
});

export { store, persistor}