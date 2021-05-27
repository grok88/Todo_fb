import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import {IconButton, Paper, Typography} from '@material-ui/core';
import { TodoType } from '../../store/todosReducer';

type TodoDetailsPropsType = {
    todo: TodoType
    onSelectedTodo: (todo: TodoType | null) => void
}

const useStyles = makeStyles({
    todoDetails: {
        height:'inherit',
        // outline: '1px solid red',
        // maxWidth: '300px',
        padding:'10px',
        // width:'100%'
        // ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
        //    width:'100%',
        //     color:'red'
        // }
    }
});

export const TodoDetails: React.FC<TodoDetailsPropsType> = React.memo((props) => {
    const classes = useStyles();
    const {todo, onSelectedTodo} = props;
    return <Paper elevation={3} className={classes.todoDetails}>
        <aside >
            <Typography variant="h4" component="h3" style={{}} align={'center'} >
                Детали задачи
                <IconButton aria-label="delete" color="default"  onClick={() => onSelectedTodo(null)}>
                    <CloseIcon  fontSize={'large'}/>
                </IconButton>
                {/*<CloseIcon onClick={() => onSelectedTodo(null)} style={{cursor: 'pointer'}} fontSize={'large'}/>*/}
            </Typography>
            {todo.title}
        </aside>
    </Paper>
});