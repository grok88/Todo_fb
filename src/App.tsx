import React, {useEffect, useState} from 'react';
import './app.scss';
import AppDrawer, {ListsType} from './components/AppDrawer/AppDrawer';
import {getLists} from './api/api';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container, Grid, LinearProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TodoListPage} from './pages/TodoListPage/TodoListPage';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {checkUserIsAuth} from './store/authReducer';
import {RequestStatusType} from './store/appReducer';
import {RegisterPage} from './pages/RegisterPage/RegisterPage';

const useStyles = makeStyles({
    app: {
        // minHeight: '100vh',
        width: '100%'
    },
    appContainer: {
        outline: '1px solid red'
    }
});

const App = () => {
    const classes = useStyles();

    const [lists, setLists] = useState<Array<ListsType>>([]);

    const dispatch = useDispatch();
    const user = useSelector<AppRootStateType, any>(state => state.auth.user);
    // const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
    // const isRegister = useSelector<AppRootStateType, boolean>(state => state.auth.isRegister);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    // console.log(user, isAuth);

    useEffect(() => {
        if (!user) {
            dispatch(checkUserIsAuth());
        }
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            // @ts-ignore
            getLists(user.uid).then(setLists);
        }
    }, [user])

    if (!user) {
        return <Switch>
            <Route exact path={'/'} render={() => <Redirect to={'/login'}/>}/>
            <Route path={'/login'} render={() => <LoginPage/>}/>
            <Route path={'/register'} render={() => <RegisterPage/>}/>
        </Switch>
    }

    return (
        <div className={classes.app}>
            <Container>
                {
                    status === 'loading' ? <LinearProgress color="secondary"/> : ''
                }
                <Grid container className={classes.appContainer}>
                    <Grid item xs={12} sm={5} md={3} xl={3}>
                        <AppDrawer lists={lists}/>
                    </Grid>
                    <Grid item xs={12} sm={7} md={9} xl={9}>
                        <Switch>
                            <Route exact path={'/'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route path={'/important'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route path={'/planned'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route path={'/:listId/:todoId?'} render={() => <TodoListPage lists={lists}/>}/>
                        </Switch>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
