import React, {useEffect, useState} from 'react';
import './app.scss';
import AppDrawer, {ListsType} from './components/AppDrawer/AppDrawer';
import {getCollection} from './api/api';
import {Route, Switch} from 'react-router-dom';
import {Container, Grid, LinearProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TodoListPage} from './pages/TodoListPage/TodoListPage';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {checkUserIsAuth} from './store/authReducer';
import {RequestStatusType} from './store/appReducer';

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
    console.log('App');
    const classes = useStyles();

    const [lists, setLists] = useState<Array<ListsType>>([]);
    // const [user, setUser] = useState<null | any>(null);

    const dispatch = useDispatch();
    const user = useSelector<AppRootStateType, any>(state => state.auth.user);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    console.log(user, isAuth);

    useEffect(() => {
        // @ts-ignore
        getCollection('lists').then(setLists);
        dispatch(checkUserIsAuth());

        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         // User is signed in, see docs for a list of available properties
        //         // https://firebase.google.com/docs/reference/js/firebase.User
        //         const uid = user.uid;
        //         const email = user.email;
        //         const name = user.displayName;
        //         setUser({
        //             uid,
        //             email,
        //             name,
        //         })
        //     } else {
        //         // User is signed out
        //         // ...
        //     }
        // })
    }, []);

    if (!isAuth) {
        return <LoginPage/>
    }
    return (
        <div className={classes.app}>
            <Container>
                {
                    status === 'loading' ? <LinearProgress color="secondary"/> : ''
                }
                <Grid container className={classes.appContainer}>
                    <Grid item xs={12} sm={5} md={3} xl={2}>
                        <AppDrawer lists={lists}/>
                    </Grid>
                    <Grid item xs={12} sm={7} md={9} xl={10}>
                        <Switch>
                            <Route exact path={'/'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route exact path={'/login'} render={() => <LoginPage/>}/>
                            <Route exact path={'/important'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route exact path={'/planned'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route path={'/:listId/:todoId?'} render={() => <TodoListPage lists={lists}/>}/>
                        </Switch>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
