import {combineReducers, createStore} from 'redux';
import {AppActionsType, appReducer} from './appReducer';

const rootReducer = combineReducers({
    app: appReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers());
export type TodoActionsType = AppActionsType;