import React from 'react';
import {List, ListItem, Typography,} from '@material-ui/core';
import {ListsType} from '../../AppDrawer/AppDrawer';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const options = [
    {title: 'По названию', sort: 'title'},
    {title: 'По важности', sort: 'important'},
    {title: 'По готовности', sort: 'completed'},
];

type TodoHeaderPropsType = {
    list?: ListsType
    sortBy: string
    onSort: (sort: string) => void
}
//styles
const useStyles = makeStyles({
    todoHeader: {
        background: 'orange',
    },
});

export const TodoHeader: React.FC<TodoHeaderPropsType> = React.memo((props) => {
    const {list, sortBy, onSort} = props;
    const classes = useStyles();

    //menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (sort: string) => {
        setAnchorEl(null);
        onSort(sort);
    };

    return <div className={classes.todoHeader}>
        <Typography variant="h3" component="h2" style={{}} align={'center'}>
            <List>
                <ListItem alignItems={'flex-start'}>
                    {list && list.title}
                    <div>
                        <IconButton
                            edge={'end'}
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MenuIcon/>
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
                                return <MenuItem key={option.title} selected={option.title === sortBy}
                                                 onClick={() => handleClose(option.sort)}>
                                    {option.title}
                                </MenuItem>
                            })}
                        </Menu>
                    </div>
                </ListItem>
            </List>
        </Typography>
    </div>
})