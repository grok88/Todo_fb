import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {TodoList} from '../../components/TodoList/TodoList';
import {TodoForm} from './TodoForm/TodoForm';
import {makeStyles} from '@material-ui/core/styles';
import {TodoDetails} from '../../components/TodoDetails/TodoDetails';
import {Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {UserType} from '../../store/authReducer';
import {getLists, ListsType, updatelist} from '../../store/listReducer';
import {createTodo, deleteTodo, getTodos, TodoType, updateTodo} from '../../store/todosReducer';

const useStyles = makeStyles({
    todoListPage: {
        padding:'0 8px'
    },
    todoContent: {
        flexGrow: 1,
    }
});

type  ParamsType = {
    listId: string
    todoId: string
}
type TodoListPagePropsType = {}

export const TodoListPage: React.FC<TodoListPagePropsType> = React.memo((props) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const user = useSelector<AppRootStateType, UserType | null>(state => state.auth.user);
    const lists = useSelector<AppRootStateType, Array<ListsType>>(state => state.list.lists);
    let todos = useSelector<AppRootStateType, Array<TodoType>>(state => state.todos.todos);

    const [selectedTodo, setSelectedTodo] = useState<null | TodoType>(null);

    //Use params
    const {listId} = useParams<ParamsType>();
    //todos
    useEffect(() => {
        // @ts-ignore
        dispatch(getTodos(user?.uid));
    }, [dispatch,user?.uid]);

    //lists
    useEffect(() => {
        if (user) {
            dispatch(getLists(user.uid));
        }
    }, [dispatch,user])

    const list = useMemo(() => lists.find(list => list.id === listId) || {
        title: 'Задачи',
        id: '',
        sort: '',
        userId: ''
    }, [lists, listId]);

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

    todos = listId ? todos.filter(todo => todo.listId === list.id) : getFilteredTodos[path](todos);
    const sortedTodos = list.sort ? todos.slice().sort(getSortedTodos[list.sort]) : todos;
    console.log(sortedTodos)

    //Add new todoTask
    const onSubmitHandler =  useCallback((title: string) => {
        const data = {
            title,
            listId: list?.id ? list?.id : '',
            userId: user?.uid,
            dueDate: null,
            important: false
        }
        if (user) dispatch(createTodo(data, user.uid));
    }, [dispatch,user, list]);

    //delete todo task by Id
    const onDeleteTodo =  useCallback((todoId: string) => {
        if (user) dispatch(deleteTodo(todoId, user.uid));
        setSelectedTodo(null);
    }, [dispatch,user]);

    // change todo task status
    const onUpdate = useCallback((field: any, todoId: string) => {
        if (user) dispatch(updateTodo(field, todoId, user.uid));
    }, [dispatch,user]);

    // onSelected todo for details
    const onSelectedTodo = useCallback((todo: TodoType | null) => {
        setSelectedTodo(todo);
    },[])

    //LISTS
    //update List
    const onUpdateList = useCallback((field: any, listId: string) => {
        if (user) dispatch(updatelist(field, listId, user.uid));
    }, [dispatch,user]);

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
                              onUpdateList={onUpdateList}
                              listId={listId}
                    />
                    <TodoForm onSubmitHandler={onSubmitHandler}/>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    {
                        selectedTodo && <TodoDetails todo={selectedTodo} onSelectedTodo={onSelectedTodo} onUpdate={onUpdate}/>
                    }
                </Grid>
            </Grid>
        </div>
    );
});

