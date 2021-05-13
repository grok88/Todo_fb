import React from 'react';
import {TodoType} from '../../pages/TodoListPage/TodoListPage';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

type TodoDetailsPropsType = {
    todo: TodoType
    onSelectedTodo: (todo: TodoType | null) => void
}

const useStyles = makeStyles({
    todoDetails: {
        outline: '1px solid red',
        maxWidth: '300px'
    }
});

export const TodoDetails: React.FC<TodoDetailsPropsType> = React.memo((props) => {
    const classes = useStyles();
    const {todo, onSelectedTodo} = props;
    return <aside className={classes.todoDetails}>
        <Typography variant="h4" component="h3" style={{}} align={'center'} >
            Детали задачи
            <CloseIcon onClick={() => onSelectedTodo(null)} style={{cursor: 'pointer'}} fontSize={'large'} />
        </Typography>
        {todo.title}

    </aside>
});