import {ThunkDispatch} from 'redux-thunk';
import {changeStatus, setError} from './appReducer';
import {AppRootStateType, TodoActionsType} from './store';
import firebase from 'firebase';

const initialState = {
    user: null as null | any,
    isAuth: false,
}

export type InitialAuthStateType = typeof initialState;

export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'APP/SET-USER':
            return {
                ...state,
                user: action.payload
            }
        case 'APP/CHANGE-ISAUTH':
            return {
                ...state,
                isAuth: action.payload
            }
        default:
            return state;
    }

}
//user
export const setUser = (user: any | null) => {
    return {
        type: 'APP/SET-USER',
        payload: user
    } as const
}

export const changeIsAuth = (isAuth: boolean) => {
    return {
        type: 'APP/CHANGE-ISAUTH',
        payload: isAuth
    } as const
}

//thunks
export const checkUserIsAuth = () => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                const email = user.email;
                const name = user.displayName;

                dispatch(changeStatus('succeeded'));
                dispatch(setUser({
                    uid,
                    email,
                    name,
                }));
                dispatch(changeIsAuth(true));
            } else {
                dispatch(changeIsAuth(false));
                dispatch(changeStatus('failed'));
            }
        })
    } catch (e) {
        console.log(e);
    }
}

export const loginByPassword = (email: string, password: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {

    dispatch(changeStatus('loading'));
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        dispatch(changeStatus('succeeded'));
        dispatch(changeIsAuth(true));
    } catch (error) {
        dispatch(changeStatus('failed'));
        //ser LoginForm serverError
        // const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(setError(errorMessage));

        // setTimeout(() => {
        //     dispatch(setError(null));
        // }, 3000);
    }
    ;
}

//types
type SetUserAC = ReturnType<typeof setUser>
type ChangeIsAuthAC = ReturnType<typeof changeIsAuth>

export type AuthActionsType =
    SetUserAC
    | ChangeIsAuthAC;
