import React, {useEffect, useState} from 'react';
import './app.scss';
import AppDrawer, {ListsType} from './components/AppDrawer/AppDrawer';
import {getCollection} from './api/api';
import {Route, Switch} from 'react-router-dom';
import {TodoList} from './components/TodoList/TodoList';
import {Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    app: {
        // minHeight: '100vh',
        width: '100%'
    },
});

const App = () => {
    console.log('App');
    const classes = useStyles();

    const [lists, setLists] = useState<Array<ListsType>>([]);
    // const [todos, setTodos] = useState<Array<TodoType>>([]);

    useEffect(() => {
        // @ts-ignore
        getCollection('lists').then(setLists);
        // @ts-ignore
        // getCollection('todos').then(setTodos);
    }, []);

    return (
        <div className={classes.app}>
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={4} md={2} xl={2}>
                        <AppDrawer lists={lists}/>
                    </Grid>
                    <Grid item xs={12} sm={8} md={10} xl={10}>
                        <Switch>
                            <Route exact path={'/:listId?'} render={() => <TodoList lists={lists}/>}/>
                        </Switch>
                    </Grid>
                </Grid>
            </Container>
        </div>

    );
}

export default App;
