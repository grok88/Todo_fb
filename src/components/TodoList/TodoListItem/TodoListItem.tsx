import {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import React from 'react';
import Checkbox from '@material/react-checkbox';
import {TodoType} from '../TodoList';


type TodoListItemPropsType = {
    todo: TodoType
    onStatusChange: () => void
}
export const TodoListItem: React.FC<TodoListItemPropsType> = React.memo((props) => {
    const {todo, onStatusChange} = props;
    console.log(todo.title)
    return (
        <ListItem>
            <ListItemGraphic graphic={<Checkbox checked={todo.completed} onChange={onStatusChange}/>}/>
            <ListItemText primaryText={todo.title}/>
        </ListItem>
    );
});