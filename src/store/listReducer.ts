import {ThunkDispatch} from 'redux-thunk';
import {changeStatus, setError} from './appReducer';
import {AppRootStateType, TodoActionsType} from './store';
import {listsAPI} from '../api/api';

export type ListsType = { title: string, id: string, sort: string, userId: string };

const initialState = {
    lists: [] as Array<ListsType>,
}

export type InitialListStateType = typeof initialState;

export const listReducer = (state: InitialListStateType = initialState, action: ListActionsType): InitialListStateType => {
    switch (action.type) {
        case 'LIST/SET-LIST':
            return {
                ...state,
                lists: action.payload
            }
        default:
            return state;
    }
}
//user
export const setList = (lists: Array<ListsType>) => {
    return {
        type: 'LIST/SET-LIST',
        payload: lists
    } as const
}
//thunks


export const getLists = (userUid: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        const lists = await listsAPI.getLists(userUid);
        dispatch(setList(lists as Array<ListsType>));
        dispatch(changeStatus('succeeded'));
    } catch (error) {
        dispatch(changeStatus('failed'));
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
    }
}
export const updatelist = (data: any, listId: string, userUid: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    debugger
    console.log(listId)
    console.log(userUid)
    try {
        await listsAPI.updateList(data, listId);
        dispatch(getLists(userUid));
        dispatch(changeStatus('succeeded'));
    } catch (error) {
        dispatch(changeStatus('failed'));
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
    }
}
export const createList = (data: any, userId: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        await listsAPI.createList(data);
        dispatch(getLists(userId));
        dispatch(changeStatus('succeeded'));
    } catch (error) {
        dispatch(changeStatus('failed'));
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
    }
}

//types
type SetUserAC = ReturnType<typeof setList>;

export type ListActionsType =
    SetUserAC;

