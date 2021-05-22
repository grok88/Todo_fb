import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import {List, ListItem, Typography} from '@material-ui/core';
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

const useStyles = makeStyles({
    appDrawer: {
        borderRight: '1px solid #E0E0E0',
        minHeight: '100vh',
        padding: '5px 0',
        ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
            borderRight: 'none',
            borderBottom: '1px solid #E0E0E0',
            minHeight: 'auto',
        }
    }
});

export type ListsType = { title: string, id: string , sort:string};

type AppDrawerPropsType = {
    lists: Array<ListsType>
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
    const {lists} = props;
    // console.log(lists)


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
                isAuth && <List>
                    <ListItem>
                        {email}
                        <IconButton aria-label="logout" onClick={onLogOut}>
                            <ExitToAppIcon/>
                        </IconButton>
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
                            onClick={(event) => handleListItemClick(event, index)}
                            component={NavLink} to={`/${item.id}`}
                        >
                            <ListItemIcon>
                                <FormatListBulletedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item.title}/>
                        </ListItem>
                    })
                }
            </List>
        </div>
    )
})


export default AppDrawer;