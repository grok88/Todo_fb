import React, {FormEvent} from 'react';
import {loginByPassword} from '../../api/api';

export const LoginPage: React.FC = React.memo(() => {
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submit');
        loginByPassword('grok88@tut.by', 'thisissparta');
    }

    return <div>
        <h1>Форма входа</h1>
        <form onSubmit={submitHandler}>
            <input type="text"/>
            <br/>
            <input type="password"/>
            <br/>
            <button type={'submit'}>Войти</button>
        </form>
    </div>
});