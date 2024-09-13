import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer  from "./userSlice";


const persistConfig = {
    key: 'root',
    storage,
}

// wrap the user reducer in the persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer
    }
});


// export the store and the persistor
export const persistor = persistStore(store);
