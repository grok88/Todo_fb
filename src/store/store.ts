import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {AppActionsType, appReducer} from './appReducer';
import {AuthActionsType, authReducer} from './authReducer';
import {ListActionsType, listReducer} from './listReducer';
import {TodosActionsType, todosReducer} from './todosReducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    list: listReducer,
    todos: todosReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export type TodoActionsType = AppActionsType
    | AuthActionsType
    | ListActionsType
    | TodosActionsType;