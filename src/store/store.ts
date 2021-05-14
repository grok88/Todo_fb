import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({

});

export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers());