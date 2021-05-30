import React, {KeyboardEvent, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import {IconButton, Paper, TextField, Typography} from '@material-ui/core';
import {TodoType} from '../../store/todosReducer';


type TodoDetailsPropsType = {
    todo: TodoType
    onSelectedTodo: (todo: TodoType | null) => void
    onUpdate: (field: any, todoId: string) => void
}
const useStyles = makeStyles({
    todoDetails: {
        height: 'inherit',
        padding: '10px',
    }
});

// const getDate = (dateValue) => {
//     let today = new Date(dateValue.seconds * 1000);
//     let dd = String(today.getDate()).padStart(2, '0');
//     let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     let yyyy = today.getFullYear();
//     return yyyy + '-' + mm + '-' + dd;
// }

export const TodoDetails: React.FC<TodoDetailsPropsType> = React.memo((props) => {
    const classes = useStyles();
    const {todo, onSelectedTodo, onUpdate} = props;

    const [value, setValue] = useState<string>(todo.title);

    // let [dateValue, setDateValue] = useState<any>(todo.dueDate ? todo.dueDate : null);
    //
    // const handleDateChange = (date: ChangeEvent<HTMLInputElement>) => {
    //     let date1 = date.currentTarget.value;
    //     onUpdate({dueDate: date.currentTarget.value}, todo.id);
    // };

    //Change todo Title
    const onTitleChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onUpdate({title: value}, todo.id);
        }
    }
    return <Paper elevation={3} className={classes.todoDetails}>
        <aside>
            <Typography variant="h4" component="h3" style={{}} align={'center'}>
                Детали задачи
                <IconButton aria-label="delete" color="default" onClick={() => onSelectedTodo(null)}>
                    <CloseIcon fontSize={'large'}/>
                </IconButton>
            </Typography>
            <div>
                <TextField label="Название"
                           value={value}
                           variant="filled" fullWidth={true}
                           onChange={(e) => setValue(e.currentTarget.value)}
                           onKeyPress={onTitleChangeHandler}
                />
                {/*<TextField*/}
                {/*    id="date"*/}
                {/*    label="Birthday"*/}
                {/*    type="date"*/}
                {/*    value={dateValue}*/}
                {/*    onChange={handleDateChange}*/}
                {/*    InputLabelProps={{*/}
                {/*        shrink: true,*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        </aside>
    </Paper>
});