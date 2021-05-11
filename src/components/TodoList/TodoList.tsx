import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AppContent from '../AppContent/AppContent';
import {getCollection, getSortedCollection} from '../../api/api';
import List from '@material/react-list';
import {Headline3} from '@material/react-typography';
import {TodoListItem} from './TodoListItem/TodoListItem';
import {ListsType} from '../AppDrawer/AppDrawer';

export type TodoType = { title: string, id: string, listId: string, completed: boolean };

type  ParamsType = {
    listId: string
}
type TodoListPropsType = {
    // todos:TodoType[]
    lists: Array<ListsType>
}
export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {

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

    // if(!list){
    //     return  <LinearProgress
    //         buffer={0.9}
    //         progress={0.8}
    //     />
    // }
    return (
        <AppContent>
            <div className={'todo-list'}>
                <Headline3 className={'todo-list__title'}>{list && list.title}</Headline3>
                <List className={'todo-list__item'}>
                    {
                        todos.map(todo => <TodoListItem key={todo.id} todo={todo}
                                                        onStatusChange={() => console.log('CHANGE')}/>)
                    }
                </List>
            </div>
        </AppContent>
    );
});