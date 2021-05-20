import {ThunkDispatch} from 'redux-thunk';
import {changeStatus, setError} from './appReducer';
import {AppRootStateType, TodoActionsType} from './store';
import firebase from 'firebase';
import {authAPI} from '../api/api';

export type UserType = {
    uid: string
    email: null | string
    name: null | string
}
const initialState = {
    user: null as null | UserType,
    isAuth: false,
    isRegister: false,
}

export type InitialAuthStateType = typeof initialState;

export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-USER':
            return {
                ...state,
                user: action.payload
            }
        case 'AUTH/CHANGE-ISAUTH':
            return {
                ...state,
                isAuth: action.payload
            }
        case 'AUTH/CHANGE-IS-REGISTER': {
            return {
                ...state,
                isRegister: action.payload
            }
        }
        default:
            return state;
    }

}
//user
export const setUser = (user: UserType | null) => {
    return {
        type: 'AUTH/SET-USER',
        payload: user
    } as const
}

export const changeIsAuth = (isAuth: boolean) => {
    return {
        type: 'AUTH/CHANGE-ISAUTH',
        payload: isAuth
    } as const
}
export const changeIsRegister = (isRegister: boolean) => {
    return {
        type: 'AUTH/CHANGE-IS-REGISTER',
        payload: isRegister
    } as const
}

//thunks
export const checkUserIsAuth = () => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        //
        // const email = localStorage.getItem('email')
        // debugger
        // if(email) {
        //     firebase.auth().sendSignInLinkToEmail(JSON.parse(email), {url: ''})
        //         .then(() => {
        //            debugger
        //             // ...
        //         })
        // }

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
                // dispatch(setUser(null));
                // dispatch(changeIsAuth(false));
                // dispatch(changeStatus('failed'));
            }
        })
    } catch (e) {
        console.log(e);
    }
}

export const logIn = (email: string, password: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {

    dispatch(changeStatus('loading'));
    try {
        const userCredential = await authAPI.loginByPassword(email, password);
        // if(userCredential.user){
        //     dispatch(setUser({
        //         uid: userCredential.user.uid,
        //         email: userCredential.user.email,
        //         name: userCredential.user.displayName,
        //     }));
        //     localStorage.setItem('email', JSON.stringify( userCredential.user.email))
        //     // firebase.auth().signInWithEmailAndPassword(email, password)
        dispatch(changeStatus('succeeded'));
        dispatch(changeIsAuth(true));
        // }

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
}
export const logOut = () => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        await authAPI.logOut();
        dispatch(changeStatus('succeeded'));
        dispatch(changeIsAuth(false));
        dispatch(changeIsRegister(false));
        dispatch(setUser(null));
    } catch (error) {
        dispatch(changeStatus('failed'));
        //ser LoginForm serverError
        // const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
    }
}
export const registerUser = (email: string, password: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        // const userCredential =
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        // const user = userCredential.user;
        dispatch(changeIsRegister(true));
        dispatch(changeStatus('succeeded'));
    } catch (error) {
        dispatch(changeStatus('failed'));
        //ser LoginForm serverError
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        dispatch(setError(errorMessage));
    }
}

//types
type SetUserAC = ReturnType<typeof setUser>
type ChangeIsAuthAC = ReturnType<typeof changeIsAuth>
type ChangeIsRegisterAC = ReturnType<typeof changeIsRegister>

export type AuthActionsType =
    SetUserAC
    | ChangeIsAuthAC
    | ChangeIsRegisterAC;
