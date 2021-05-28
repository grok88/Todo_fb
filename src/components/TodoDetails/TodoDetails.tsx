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
        // outline: '1px solid red',
        // maxWidth: '300px',
        padding: '10px',
        // width:'100%'
        // ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
        //    width:'100%',
        //     color:'red'
        // }
    }
});

const getDate = (dateValue) => {
    let today = new Date(dateValue.seconds * 1000);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return  mm + '/' + dd + '/' + yyyy;
}

export const TodoDetails: React.FC<TodoDetailsPropsType> = React.memo((props) => {
    const classes = useStyles();
    const {todo, onSelectedTodo, onUpdate} = props;

    const [value, setValue] = useState<string>(todo.title);
    let [dateValue, setDateValue] = useState<any>(todo.dueDate ?  getDate(todo.dueDate) : null);
    console.log(dateValue)

    // const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    //     // new Date(dateValue.seconds * 1000),
    //     new Date(),
    // );
    //
    // const handleDateChange = (date: Date | null) => {
    //     setSelectedDate(date);
    // };

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
                           value={value} variant="filled" fullWidth={true}
                           onChange={(e) => setValue(e.currentTarget.value)}
                           onKeyPress={onTitleChangeHandler}
                />
                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                {/*    <DatePicker value={selectedDate} onChange={handleDateChange} />*/}
                {/*    <TimePicker value={selectedDate} onChange={handleDateChange} />*/}
                {/*    <DateTimePicker value={selectedDate} onChange={handleDateChange} />*/}
                {/*</MuiPickersUtilsProvider>*/}

                {dateValue && dateValue }
            </div>

        </aside>
    </Paper>
});