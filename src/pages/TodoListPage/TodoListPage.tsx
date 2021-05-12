import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {createTodo, deleteTodoTask, getCollection, getSortedCollection} from '../../api/api';
import {TodoList} from '../../components/TodoList/TodoList';
import {ListsType} from '../../components/AppDrawer/AppDrawer';
import {TodoForm} from './TodoForm/TodoForm';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    todoListPage: {
        padding: '10px'
    }
});

export type TodoType = { title: string, id: string, listId: string, completed: boolean };

type  ParamsType = {
    listId: string
}
type TodoListPagePropsType = {
    // todos:TodoType[]
    lists: Array<ListsType>
}
export const TodoListPage: React.FC<TodoListPagePropsType> = React.memo((props) => {
    console.log('TodoListPage');
    const classes = useStyles();

    const [todos, setTodos] = useState<Array<TodoType>>([]);
    const {listId} = useParams<ParamsType>();
    console.log(todos)

    useEffect(() => {
        if (listId) {
            // @ts-ignore
            getSortedCollection('todos', 'listId', listId).then(setTodos);
        } else {
            // @ts-ignore
            getCollection('todos').then(setTodos);
        }
    }, [listId]);

    const list = props.lists.find(list => list.id === listId);

    //Add new todoTask
    const onSubmitHandler = (title: string) => {
        const data = {
            title,
            listId: list?.id
        }
        createTodo(data)
            .then((todo: any) => {
                setTodos([...todos, todo]);
            });
    }

    //delete todo task by Id
    const onDeleteTodo = (todoId: string) => {
        deleteTodoTask(todoId)
            .then(todoId => {
                setTodos(todos.filter(todo => todo.id !== todoId))
            })
    }

    // if(!list ){
    //     return  <LinearProgress color="secondary" />
    // }
    return (
        <div className={classes.todoListPage}>
            <TodoList list={list} todos={todos} onDeleteTodo={onDeleteTodo}/>
            <TodoForm onSubmitHandler={onSubmitHandler}/>
        </div>
    );
});