import React, {useCallback, useEffect} from 'react';
import './app.scss';
import AppDrawer from './components/AppDrawer/AppDrawer';
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
import {createList} from './store/listReducer';

const useStyles = makeStyles({
    app: {
        // minHeight: '100vh',
        width: '100%'
    },
    appContainer: {
        // outline: '1px solid red'
    }
});

const App = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const user = useSelector<AppRootStateType, any>(state => state.auth.user);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    useEffect(() => {
        if (!user) dispatch(checkUserIsAuth());
    }, [dispatch]);

    //Create new list
    const onCreateList = useCallback((title: string) => {
        const data = {
            title,
            userId: user.uid
        }
        dispatch(createList(data, user.uid));
    }, [user]);

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
                        <AppDrawer onCreateList={onCreateList}/>
                    </Grid>
                    <Grid item xs={12} sm={7} md={9} xl={9}>
                        <Switch>
                            <Route exact path={'/'}
                                   render={() => <TodoListPage/>}/>
                            <Route path={'/important'}
                                   render={() => <TodoListPage/>}/>
                            <Route path={'/planned'}
                                   render={() => <TodoListPage/>}/>
                            <Route path={'/:listId/:todoId?'}
                                   render={() => <TodoListPage/>}/>
                        </Switch>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
