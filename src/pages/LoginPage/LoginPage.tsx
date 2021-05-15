import React, {FormEvent} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {loginByPassword} from '../../store/authReducer';
import {AppRootStateType} from '../../store/store';
import {Button, Container, Paper, TextField, Typography} from '@material-ui/core';

import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {setError} from '../../store/appReducer';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    loginBlock: {
        background: '#DFDFDF',
        display: 'flex',
        alignItems: 'center'
    },
    paper: {
        margin: '0px auto',
        textAlign: 'center',
        padding: '12px',
        width: 'calc(100% - 24px)',
        maxWidth: '496px'
    },
    paperInner: {
        padding: '24px',
        borderRadius: '6px',
        backgroundColor: '#fff'
    },
    loginContent: {
        padding: '24px 24px 0px',
        minHeight: '386px'
    },
    loginContentTitle: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '1.5rem',
        fontWeight: 400,
        fontFamily: 'Roboto',
        lineHeight: '1.35417em',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    submitReg: {
        background: '#2e7d32',
        color:'white',
        '&:hover': {
            backgroundColor: '#135e13',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#3e8036',
        },
    },
    text: {
        padding: '12px 0px',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '1rem',
        fontWeight: 400,
        fontFamily: 'Roboto',
        lineHeight: ' 1.5em',
        margin:0
    }
}));

export const LoginPage: React.FC = React.memo(() => {
    const classes = useStyles();
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

    return <Container component="main" className={classes.loginBlock}>
        <div className={classes.paper}>
            <Paper className={classes.paperInner} elevation={2}>
                <div className={classes.loginContent}>
                    <Typography component="h3" variant="h5" className={classes.loginContentTitle}>
                        Log into your account
                    </Typography>
                    <form className={classes.form}>
                        <TextField id="standard-search" label="Email Address"
                                   type="email" required fullWidth
                                   name="email"
                                   // autoFocus
                                   helperText={'The field is empty'}
                                   // error
                        />
                        <TextField id="standard-search" label="Password" type="password" required fullWidth
                                   name="password" style={{marginTop: '8px'}}/>
                        {/*<TextField*/}
                        {/*    variant="outlined"*/}
                        {/*    margin="normal"*/}
                        {/*    required*/}
                        {/*    fullWidth*/}
                        {/*    id="email"*/}
                        {/*    label="Email Address"*/}
                        {/*    name="email"*/}
                        {/*    autoComplete="email"*/}
                        {/*    autoFocus*/}
                        {/*/>*/}
                        {/*<TextField*/}
                        {/*    variant="outlined"*/}
                        {/*    margin="normal"*/}
                        {/*    required*/}
                        {/*    fullWidth*/}
                        {/*    name="password"*/}
                        {/*    label="Password"*/}
                        {/*    type="password"*/}
                        {/*    id="password"*/}
                        {/*    autoComplete="current-password"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Sign In</Button>
                        <div style={{textAlign: 'center', margin:'0'}}>
                            <p className={classes.text}> {'Don\'t have an account? Sign Up'}</p>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submitReg}
                            component={NavLink}
                            to={'/register'}
                        >Register</Button>
                    </form>
                </div>
            </Paper>
        </div>
        {/*<h1>Форма входа</h1>*/}
        {/*<form onSubmit={submitHandler}>*/}
        {/*    <input type="text"/>*/}
        {/*    <br/>*/}
        {/*    <input type="password"/>*/}
        {/*    <br/>*/}
        {/*    <button type={'submit'}>Войти</button>*/}
        {/*</form>*/}
        {/*<Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>*/}
        {/*    <Alert onClose={handleClose} severity="error">*/}
        {/*        {error}*/}
        {/*    </Alert>*/}
        {/*</Snackbar>*/}
    </Container>
});