import { createStore,applyMiddleware, compose,  } from "redux";
import reducers from "../Store/reducers";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import SplashScreen from 'react-native-splash-screen'
import thunk from 'redux-thunk';

//REDUX SETUP

import reactotron from '../Configs/ReactotronConfig';

const persistConfig = {
    key: "root",
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);
const enhancer = compose(applyMiddleware(thunk), reactotron.createEnhancer());

const store = createStore(
    persistedReducer,enhancer
);
const persistor = persistStore(store, {}, () => {
    SplashScreen.hide();
});

export { store, persistor}
