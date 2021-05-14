import React, {useEffect, useState} from 'react';
import './app.scss';
import AppDrawer, {ListsType} from './components/AppDrawer/AppDrawer';
import {getCollection} from './api/api';
import {Route, Switch} from 'react-router-dom';
import {Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TodoListPage} from './pages/TodoListPage/TodoListPage';

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

    useEffect(() => {
        // @ts-ignore
        getCollection('lists').then(setLists);
    }, []);

    return (
        <div className={classes.app}>
            <Container>
                <Grid container className={classes.appContainer}>
                    <Grid item xs={12} sm={5} md={3} xl={2}>
                        <AppDrawer lists={lists}/>
                    </Grid>
                    <Grid item xs={12} sm={7} md={9} xl={10}>
                        <Switch>
                            <Route exact path={'/'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route exact path={'/important'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route exact path={'/planned'} render={() => <TodoListPage lists={lists}/>}/>
                            <Route  path={'/:listId/:todoId?'} render={() => <TodoListPage lists={lists}/>}/>
                        </Switch>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
