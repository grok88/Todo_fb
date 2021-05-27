import {ThunkDispatch} from 'redux-thunk';
import {changeStatus, setError} from './appReducer';
import {AppRootStateType, TodoActionsType} from './store';
import {todosAPI} from '../api/api';

export type TodoType = {
    title: string, id: string,
    listId: string,
    completed: boolean,
    dueDate: null | string
    important: boolean
    notes: string
    userId: string
    steps: Array<any>
};

const initialState = {
    todos: [] as Array<TodoType>,
}

export type InitialTodosStateType = typeof initialState;

export const todosReducer = (state: InitialTodosStateType = initialState, action: TodosActionsType): InitialTodosStateType => {
    switch (action.type) {
        case 'TODOS/SET-TODOS':
            return {
                ...state,
                todos: action.payload
            }
        default:
            return state;
    }
}
//user
export const setTodos = (todos: Array<TodoType>) => {
    return {
        type: 'TODOS/SET-TODOS',
        payload: todos
    } as const
}

//thunks
export const getTodos = (userId: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        const todos = await todosAPI.getTodos(userId);
        dispatch(setTodos(todos as Array<TodoType>));
        dispatch(changeStatus('succeeded'));
    } catch (error) {
        dispatch(changeStatus('failed'));
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
    }
}
export const createTodo = (data: any, userId: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        await todosAPI.createTodo(data);
        dispatch(getTodos(userId));
        dispatch(changeStatus('succeeded'));
    } catch (error) {
        dispatch(changeStatus('failed'));
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
    }
}

export const updateTodo = (data: any, todoId: string, userId: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        await todosAPI.updateTodo(data, todoId);
        dispatch(getTodos(userId));
        dispatch(changeStatus('succeeded'));
    } catch (error) {
        dispatch(changeStatus('failed'));
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
    }
}
export const deleteTodo = (todoId: string ,userId: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TodoActionsType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        await todosAPI.deleteTodo( todoId);
        dispatch(getTodos(userId));
        dispatch(changeStatus('succeeded'));
    } catch (error) {
        dispatch(changeStatus('failed'));
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
    }
}

//types
type SetTodosAC = ReturnType<typeof setTodos>;

export type TodosActionsType =
    SetTodosAC;

