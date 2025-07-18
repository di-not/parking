import { combineReducers, configureStore } from "@reduxjs/toolkit";
import topologySlice from "./slices/topology.slice";
import searchParamsSlice from "./slices/searchParams.slice";
import parkingsSlice from "./slices/parkings.slice";
import authSlice from "./slices/auth.slice";
import simulationSlice from "./slices/simulation.slice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    search: searchParamsSlice,
    topology: topologySlice,
    parkings:parkingsSlice,
    auth:authSlice,
    simulation:simulationSlice
});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
	whitelist: ['topology','auth','simulation']
};

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
