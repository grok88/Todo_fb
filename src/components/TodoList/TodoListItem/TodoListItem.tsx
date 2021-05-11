import React from 'react';

import {TodoType} from '../TodoList';
import {Checkbox, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

type TodoListItemPropsType = {
    todo: TodoType
    onStatusChange: () => void
}
export const TodoListItem: React.FC<TodoListItemPropsType> = React.memo((props) => {
    const {todo, onStatusChange} = props;
    return (
        <ListItem key={todo.id} dense button onClick={onStatusChange}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={todo.completed}
                    disableRipple
                />
            </ListItemIcon>
            <ListItemText>
                {todo.title}
            </ListItemText>
        </ListItem>
    );
});