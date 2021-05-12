import React, {FormEvent, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

const useStyles = makeStyles({
    todoForm: {}
});

type TodoFormPropsType = {
    onSubmitHandler: (title: string) => void
}

export const TodoForm: React.FC<TodoFormPropsType> = React.memo(({onSubmitHandler}) => {
    console.log('TodoForm');
    const classes = useStyles();

    const [title, setTitle] = useState<string>('');

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitHandler(title);
        setTitle('');
    }
    return (
        <form className={classes.todoForm} onSubmit={onSubmit}>
            <TextField label="Добавить задачу..." fullWidth={true} onChange={(e) => setTitle(e.currentTarget.value)}
                       value={title}/>
        </form>
    );
})