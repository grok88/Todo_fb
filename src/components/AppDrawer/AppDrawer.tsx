import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import {List, ListItem, ListItemSecondaryAction, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Divider from '@material-ui/core/Divider';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import {logOut} from '../../store/authReducer';
import {AddList} from './AddList/AddList';
import DeleteIcon from '@material-ui/icons/Delete';
import {ListsType} from '../../store/listReducer';


const useStyles = makeStyles({
    appDrawer: {
        borderRight: '1px solid #E0E0E0',
        minHeight: '100vh',
        padding: '5px',
        ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
            borderRight: 'none',
            borderBottom: '1px solid #E0E0E0',
            minHeight: 'auto',
        }
    },
    logout: {
        padding: 0
    },
});


type AppDrawerPropsType = {
    onCreateList: (title: string) => void
    onDeleteList: (userId: string) => void
}

const getAvatarIcon = (icon) => {
    switch (icon) {
        case 'HomeIcon':
            return (<HomeIcon/>);
        case 'StarIcon':
            return (<StarIcon/>);
        case 'EventNoteIcon':
            return (<EventNoteIcon/>);
    }
}

const AppDrawer: React.FC<AppDrawerPropsType> = React.memo((props) => {
    const classes = useStyles();
    const {onCreateList, onDeleteList} = props;

    const lists = useSelector<AppRootStateType, Array<ListsType>>(state => state.list.lists);
    const email = useSelector<AppRootStateType, any>(state => state.auth.user?.email);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
    const dispatch = useDispatch();

    //Selected nav main item
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedListIndex, setSelectedListIndex] = React.useState(3);

    const history = useHistory();

    const handleItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
        setSelectedListIndex(3);
    };
    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedListIndex(index);
    };

    //logout
    const onLogOut = () => {
        dispatch(logOut());
        history.push('/');
    }
    return (
        <div className={classes.appDrawer}>
            <Typography variant="h4" component="h1" style={{marginLeft: '16px'}} align={'center'}>
                React Todo
            </Typography>
            {
                isAuth && <List className={classes.logout}>
                    <ListItem style={{padding: 0, color: 'blue'}} divider>
                        <div style={{margin: '0 auto', marginBottom: '8px'}}>
                            {email}
                            <IconButton aria-label="logout" onClick={onLogOut} style={{padding: '0 0 0 8px'}}>
                                <ExitToAppIcon color={'primary'}/>
                            </IconButton>
                        </div>
                    </ListItem>
                </List>
            }
            <List component="nav">
                {
                    [
                        {title: 'Задачи', icon: 'HomeIcon', to: '/'},
                        {title: 'Важно', icon: 'StarIcon', to: '/important'},
                        {title: 'Запланированные', icon: 'EventNoteIcon', to: '/planned'},
                    ].map((item, index) => {
                        return <ListItem
                            key={item.title}
                            button
                            selected={selectedIndex === index}
                            onClick={(event) => handleItemClick(event, index)}
                            component={NavLink} to={item.to}
                        >
                            <ListItemIcon>
                                {getAvatarIcon(item.icon)}
                            </ListItemIcon>
                            <ListItemText primary={item.title}/>
                        </ListItem>
                    })
                }
            </List>
            <Divider/>
            <List component="nav">
                {
                    lists.map((item, index) => {
                        return <ListItem
                            key={item.title}
                            button
                            selected={selectedListIndex === index}
                            component={NavLink} to={`/${item.id}`}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                            <ListItemIcon>
                                <FormatListBulletedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item.title}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => onDeleteList(item.id)} style={{cursor: 'pointer'}}
                                            edge={'end'}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })
                }
            </List>
            <AddList onCreateList={onCreateList}/>
        </div>
    )
})


export default AppDrawer;