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

//types
type ChangeStatusAC = ReturnType<typeof changeStatus>
type SetErrorAC = ReturnType<typeof setError>

export type AppActionsType =
    | ChangeStatusAC
    | SetErrorAC;
