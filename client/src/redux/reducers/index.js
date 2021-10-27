import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {authReducer as auth} from './auth';
import {storeReducer as store} from './store'
import { ordersReducer as orders } from "./orders";
import notifications from './notifications';

const persistConfig = {
    key: 'root',
    storage,
    whilelist: ['auth', 'orders']
}

const rootReducer = combineReducers({
    notifications,
    auth,
    store,
    orders
});

export default persistReducer(persistConfig, rootReducer)