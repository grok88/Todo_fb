import React, {FormEvent} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {loginByPassword} from '../../store/authReducer';
import {AppRootStateType} from '../../store/store';
import {Snackbar} from '@material-ui/core';

import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {setError} from '../../store/appReducer';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const LoginPage: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, null | string>(state => state.app.error);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submit');
        dispatch(loginByPassword('grok88@tut.by', 'thisissparta'));
        // loginByPassword('grok88@tut.by', 'thisissparta');
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setError(null));
    };

    return <div>
        <h1>Форма входа</h1>
        <form onSubmit={submitHandler}>
            <input type="text"/>
            <br/>
            <input type="password"/>
            <br/>
            <button type={'submit'}>Войти</button>
        </form>
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    </div>
});