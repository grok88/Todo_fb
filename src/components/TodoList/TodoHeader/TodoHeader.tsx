import React from 'react';
import {ListItem, Typography, List,} from '@material-ui/core';
import {ListsType} from '../../AppDrawer/AppDrawer';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
    'По названию',
    'По важности',
    'По готовности',

];

type TodoHeaderPropsType = {
    list?: ListsType
}
//styles
const useStyles = makeStyles({
    todoHeader: {
        background: 'orange',
    },
});

export const TodoHeader: React.FC<TodoHeaderPropsType> = React.memo((props) => {
    const {list} = props;
    const classes = useStyles();

    //menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        console.log(anchorEl);
    };

    return <div className={classes.todoHeader} >
        <Typography variant="h3" component="h2" style={{margin: '16px'}} align={'center'}>
            <List >
                <ListItem alignItems={'flex-start'} >
                    {list && list.title}
                    <div >
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
                            {options.map((option) => (
                                <MenuItem key={option} selected={option === 'По названию'} onClick={handleClose}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </ListItem>
            </List>
        </Typography>
    </div>
})