import React from 'react';
import {List, ListItem, ListItemSecondaryAction, Typography,} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {ListsType} from '../../../store/listReducer';

const options = [
    {title: 'По названию', sort: 'title'},
    {title: 'По важности', sort: 'important'},
    {title: 'По готовности', sort: 'completed'},
];

type TodoHeaderPropsType = {
    list: ListsType
    onUpdateList: (field: any, listId: string) => void
    listId:string
}
//styles
const useStyles = makeStyles({
    todoHeader: {
        background: '#1976D2',
    },
    Typography: {
        fontSize: '1.25rem',
        fontFamily: 'Roboto',
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
    }
});

export const TodoHeader: React.FC<TodoHeaderPropsType> = React.memo((props) => {
    const {list, onUpdateList,listId} = props;
    const classes = useStyles();
    console.log(list)
    //menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (sort: string) => {
        if (typeof sort !== 'string') {
            setAnchorEl(null);
            return
        }
        setAnchorEl(null);
        onUpdateList({sort}, list.id);
    };

    return <div className={classes.todoHeader}>
        <Typography variant="h3" component="h2" style={{color: 'white'}} align={'center'}>
            <List>
                <ListItem alignItems={'flex-start'}>
                    {list && list.title}
                    {
                        listId &&  <ListItemSecondaryAction>
                            <IconButton
                                edge={'end'}
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MenuIcon style={{color: 'white'}}/>
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        // maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                {options.map((option) => {
                                    return <MenuItem key={option.title} selected={option.sort === list.sort}
                                                     onClick={() => handleClose(option.sort)}>
                                        {option.title}
                                    </MenuItem>
                                })}
                            </Menu>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
            </List>
        </Typography>
    </div>
})