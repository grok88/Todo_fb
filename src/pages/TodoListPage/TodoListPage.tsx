import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';

import {createTodo, deleteTodoTask, getTodos, updateTodo} from '../../api/api';
import {TodoList, TodoType} from '../../components/TodoList/TodoList';
import {TodoForm} from './TodoForm/TodoForm';
import {makeStyles} from '@material-ui/core/styles';
import {TodoDetails} from '../../components/TodoDetails/TodoDetails';
import {Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {UserType} from '../../store/authReducer';
import {ListsType} from '../../components/AppDrawer/AppDrawer';

const useStyles = makeStyles({
    todoListPage: {
        // padding: '0 10px',

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
    onUpdateList:(field: any, listId: string) => void
}
export const TodoListPage: React.FC<TodoListPagePropsType> = React.memo((props) => {
    const classes = useStyles();

    let [todos, setTodos] = useState<Array<TodoType>>([]);
    const user = useSelector<AppRootStateType, UserType | null>(state => state.auth.user);
    const [selectedTodo, setSelectedTodo] = useState<null | TodoType>(null);
    // const [sortBy, setSortBy] = useState<string>('');
    //Use params
    const {
        listId,
        // todoId
    } = useParams<ParamsType>();


    useEffect(() => {
        // @ts-ignore
        getTodos(user?.uid).then(setTodos);
    }, [user?.uid]);

    const list = useMemo(() => props.lists.find(list => list.id === listId) || {
        title: 'задачи',
        id: '',
        sort: ''
    }, [props.lists, listId]);

    const path = useLocation().pathname;

    //filter todos by url
    const getFilteredTodos = ({
        '/': todos => todos,
        '/important': todos => todos.filter(todo => todo.important),
        '/planned': todos => todos.filter(todo => todo.dueDate),
    })
    // filter todos by values

    const getSortedTodos = ({
        title: (a, b) => a.title.localeCompare(b.title),
        // @ts-ignore
        // date: (a, b) => new Date(a.seconds * 1000) - new Date(b.seconds * 1000),
        important: (a, b) => b.important - a.important,
        completed: (a, b) => b.completed - a.completed,
    })
    console.log(todos)
    todos = listId ? todos.filter(todo => todo.listId === list.id) : getFilteredTodos[path](todos);
    console.log(todos);
    const sortedTodos = list.sort ? todos.slice().sort(getSortedTodos[list.sort]) : todos;
    console.log(sortedTodos)

    //sort todos
    // const onSortTodos = (sort: string) => {
    //     setSortBy(sort);
    // }
    //Add new todoTask
    const onSubmitHandler = (title: string) => {
        const data = {
            title,
            listId: list?.id ? list?.id : '',
            userId: user?.uid,
            dueDate: null,
            important:false
        }
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
                    <TodoList list={list} todos={sortedTodos}
                              onSelectedTodo={onSelectedTodo}
                              onDeleteTodo={onDeleteTodo}
                              onUpdate={onUpdate}
                              // sortBy={sortBy}
                              // onSort={onSortTodos}
                              onUpdateList={props.onUpdateList}
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

