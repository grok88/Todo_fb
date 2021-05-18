import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';

import {changeTodoTaskStatus, createTodo, deleteTodoTask, getSortedCollection, getTodos} from '../../api/api';
import {TodoList} from '../../components/TodoList/TodoList';
import {ListsType} from '../../components/AppDrawer/AppDrawer';
import {TodoForm} from './TodoForm/TodoForm';
import {makeStyles} from '@material-ui/core/styles';
import {TodoDetails} from '../../components/TodoDetails/TodoDetails';
import {Grid, LinearProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {UserType} from '../../store/authReducer';

const useStyles = makeStyles({
    todoListPage: {
        padding: '10px',
    },
    todoContent:{
        flexGrow: 1,
    }
});

export type TodoType = { title: string, id: string, listId: string, completed: boolean };

type  ParamsType = {
    listId: string
    todoId:string
}
type TodoListPagePropsType = {
    // todos:TodoType[]
    lists: Array<ListsType>
}
export const TodoListPage: React.FC<TodoListPagePropsType> = React.memo((props) => {
    console.log('TodoListPage');
    const classes = useStyles();

    const [todos, setTodos] = useState<Array<TodoType>>([]);
    const user = useSelector<AppRootStateType, UserType | null>(state => state.auth.user);

    console.log(todos)
    const [selectedTodo, setSelectedTodo] = useState<null | TodoType>(null);
    //Use params
    const {listId,todoId} = useParams<ParamsType>();
    console.log(listId)

    useEffect(() => {
        if (listId) {
            // @ts-ignore
            getSortedCollection('todos', 'listId', listId).then(setTodos);
        } else {
            // @ts-ignore
            getTodos(user?.uid).then(setTodos);
        }
    }, [listId]);

    const list = useMemo(() => props.lists.find(list => list.id === listId), [props.lists,listId]) ;

    //Add new todoTask
    const onSubmitHandler = (title: string) => {
        const data = {
            title,
            listId: list?.id ? list?.id : '',
            userId:user?.uid,
            dueDate:null
        }
        console.log(data)
        createTodo(data)
            .then((todo: any) => {
                setTodos([...todos, todo]);
            });
    }

    //delete todo task by Id
    const onDeleteTodo = (todoId: string) => {
        deleteTodoTask(todoId)
            .then(todoId => {
                setTodos(todos.filter(todo => todo.id !== todoId));
                setSelectedTodo(null);
            })
    }
    // change todo task status
    const onStatusChange = (value: boolean, todoId: string) => {
        changeTodoTaskStatus(value, todoId)
            .then(() => {
                // @ts-ignore
                getSortedCollection('todos', 'listId', listId).then(setTodos);
                // console.log('SUCCESS')
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
                              onDeleteTodo={onDeleteTodo} onStatusChange={onStatusChange}
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

