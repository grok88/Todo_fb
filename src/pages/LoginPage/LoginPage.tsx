import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {Button, Container, Paper, Snackbar, TextField, Typography} from '@material-ui/core';

import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {setError} from '../../store/appReducer';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import {useFormik} from 'formik';
import {loginByPassword} from '../../store/authReducer';


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
        color: 'white',
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
        margin: 0
    }
}));

type ValuesPropsType = {
    email: string
    password: string
}
type ErrorsType = {
    email?: string
    password?: string
}
// FORMIK VALIDATION
const validate = (values: ValuesPropsType) => {
    const errors: ErrorsType = {};

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length <= 5) {
        errors.password = 'Must be 6 characters or more';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

export const LoginPage: React.FC = React.memo(() => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values: ValuesPropsType) => {
            dispatch(loginByPassword(values.email, values.password));
            // alert(JSON.stringify(values, null, 2));
            formik.resetForm();
            // dispatch(loginByPassword('grok88@tut.by', 'thisissparta'));
        },
    });

    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, null | string>(state => state.app.error);

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
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <TextField
                            id="email"
                            label="Email Address"
                            type="email"
                            {...formik.getFieldProps('email')}
                            fullWidth
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField id="password"
                                   label="Password"
                                   type=" password"
                                   fullWidth
                                   {...formik.getFieldProps('password')}
                                   style={{marginTop: '8px'}}
                                   error={formik.touched.password && Boolean(formik.errors.password)}
                                   helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Sign In</Button>
                        <div style={{textAlign: 'center', margin: '0'}}>
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
                <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </Paper>
        </div>
    </Container>
});