import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TodoActionsType} from './store';


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    error: null as null | string,
    status: 'idle' as RequestStatusType,
}

export type InitialAppStateType = typeof initialState;

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'APP/CHANGE-STATUS':
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }

}

export const changeStatus = (status: RequestStatusType) => {
    return {
        type: 'APP/CHANGE-STATUS',
        payload: status
    } as const
}

export const setError = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        payload: error
    } as const
}


//thunks
export const logoutUser = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {

    dispatch(changeStatus('loading'));
    try {
        // await API.logout(link, session_id);

        dispatch(changeStatus('succeeded'));
        // dispatch(setUser(null));
        // dispatch(changeIsAuth(false));
        // dispatch(changeDisabled(false));
    } catch (e) {
        dispatch(changeStatus('failed'));
        //ser LoginForm serverError
        dispatch(setError(e.response.data.status_message));

        setTimeout(() => {
            dispatch(setError(null));
        }, 3000);
    };
}


//types
type ChangeStatusAC = ReturnType<typeof changeStatus>
type SetErrorAC = ReturnType<typeof setError>

export type AppActionsType =
    | ChangeStatusAC
    | SetErrorAC;
