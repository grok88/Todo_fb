import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';

import {createTodo, deleteTodoTask, getSortedCollection, getTodos, updateTodo} from '../../api/api';
import {TodoList, TodoType} from '../../components/TodoList/TodoList';
import {ListsType} from '../../components/AppDrawer/AppDrawer';
import {TodoForm} from './TodoForm/TodoForm';
import {makeStyles} from '@material-ui/core/styles';
import {TodoDetails} from '../../components/TodoDetails/TodoDetails';
import {Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {UserType} from '../../store/authReducer';

const useStyles = makeStyles({
    todoListPage: {
        padding: '10px',
    },
    todoContent: {
        flexGrow: 1,
    }
});

type  ParamsType = {
    listId: string
    todoId: string
}
type TodoListPagePropsType = {
    // todos:TodoType[]
    lists: Array<ListsType>
}
export const TodoListPage: React.FC<TodoListPagePropsType> = React.memo((props) => {
    const classes = useStyles();

    let [todos, setTodos] = useState<Array<TodoType>>([]);
    const user = useSelector<AppRootStateType, UserType | null>(state => state.auth.user);
    const [selectedTodo, setSelectedTodo] = useState<null | TodoType>(null);
    //Use params
    const {listId,
        // todoId
    } = useParams<ParamsType>();

    // console.log(useLocation().pathname)

    useEffect(() => {
            // if (listId) {
            //     // @ts-ignore
            //     getSortedCollection('todos', 'listId', listId).then(setTodos);
            // } else {
            // @ts-ignore
            getTodos(user?.uid).then(setTodos);
            // }
        },
        [user?.uid]
    );


    const list = useMemo(() => props.lists.find(list => list.id === listId) || {
        title: 'задачи',
        id: ''
    }, [props.lists, listId]);
    const path = useLocation().pathname;


    const getFilteredTodos = ({
        '/': todos => todos,
        '/important': todos => todos.filter(todo => todo.important),
        '/planned': todos => todos.filter(todo => todo.dueDate),
    })
    console.log(todos)
    console.log(listId)
    // console.log(getFilteredTodos[path](todos))
    todos = listId ? todos.filter(todo => todo.listId === list.id) : getFilteredTodos[path](todos);
    console.log(todos);

    //Add new todoTask
    const onSubmitHandler = (title: string) => {
        const data = {
            title,
            listId: list?.id ? list?.id : '',
            userId: user?.uid,
            dueDate: null
        }
        console.log(data)
        createTodo(data)
            .then((todo: any) => {
                // setTodos([...todos, todo]);
                // @ts-ignore
                getTodos(user?.uid).then(setTodos);
            });
    }

    //delete todo task by Id
    const onDeleteTodo = (todoId: string) => {
        deleteTodoTask(todoId)
            .then(todoId => {
                // setTodos(todos.filter(todo => todo.id !== todoId));
                // @ts-ignore
                getTodos(user?.uid).then(setTodos);
                setSelectedTodo(null);
            })
    }
    // change todo task status
    const onUpdate = (field: any, todoId: string) => {
        updateTodo(field, todoId)
            .then(() => {
                // @ts-ignore
                // getSortedCollection('todos', 'listId', listId).then(setTodos);
                // console.log('SUCCESS')
                getTodos(user?.uid).then(setTodos);
            });
    }
    // onSelected todo for details
    const onSelectedTodo = (todo: TodoType | null) => {
        setSelectedTodo(todo);
    }
    // if(!list || !todos){
    //     return  <LinearProgress color="secondary" />
    // }
    return (
        <div className={classes.todoListPage}>
            <Grid container>
                <Grid item className={classes.todoContent}>
                    <TodoList list={list} todos={todos}
                              onSelectedTodo={onSelectedTodo}
                              onDeleteTodo={onDeleteTodo}
                              onUpdate={onUpdate}
                    />
                    <TodoForm onSubmitHandler={onSubmitHandler}/>
                </Grid>
                <Grid item xs={12} sm={12} md={'auto'}>
                    {
                        selectedTodo && <TodoDetails todo={selectedTodo} onSelectedTodo={onSelectedTodo}/>
                    }
                </Grid>
            </Grid>
        </div>
    );
});

