import {Button, TextField} from '@material-ui/core';
import React, {FormEvent, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    addListBlock: {},
    addListForm: {}
});

type AddListPropsType = {
    onCreateList: (title: string) => void
}

export const AddList: React.FC<AddListPropsType> = React.memo((props) => {
    const {onCreateList} = props;
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(title){
            onCreateList(title);
        }
        setTitle('');
        setIsOpen(false);
    }

    return <div className={classes.addListBlock}>
        {
            isOpen
                ? <form className={classes.addListForm} onSubmit={onSubmit}>
                    <TextField label="Добавить список..." fullWidth={true} onChange={(e) => setTitle(e.currentTarget.value)}
                               value={title}/>
                </form>
                : <Button fullWidth variant={'outlined'} color={'primary'} onClick={() => setIsOpen(true)}>Добавить
                    список</Button>
        }
    </div>
});