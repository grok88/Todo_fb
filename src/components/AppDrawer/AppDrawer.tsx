import React from 'react';
// import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from 'mdc-react';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {DrawerContent, DrawerHeader, DrawerTitle,} from '@material/react-drawer';
import List, {ListDivider, ListGroup, ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import {NavLink} from 'react-router-dom';

import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    appDrawer: {
        borderRight:'1px solid #E0E0E0',
        minHeight: '100vh',
        ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
          borderRight:'none',
          borderBottom:'1px solid #E0E0E0',
        }
    }
});

export type ListsType = { title: string, id: string};

type AppDrawerPropsType = {
    lists: Array<ListsType>
}
const AppDrawer: React.FC<AppDrawerPropsType> = React.memo((props) => {
    const {lists} = props;
    const classes = useStyles();
    // console.log('AppDrawer');
    // console.log(lists);

    return (
        <div className={classes.appDrawer}>
            <DrawerHeader>
                <DrawerTitle tag='h2'>
                    React Todo
                </DrawerTitle>
            </DrawerHeader>
            <DrawerContent tag='main'>
                <ListGroup>
                    <List>
                        {
                            [
                                {title: 'Задачи', icon: 'home', to: '/'},
                                {title: 'Важно', icon: 'star', to: '/important'},
                                {title: 'Запланированные', icon: 'event', to: '/planned'},
                            ].map(item => <ListItem
                                style={{marginBottom: '10px'}}
                                key={item.title}
                            >
                                <NavLink to={item.to} style={{color: 'inherit', textDecoration: 'none'}}>
                                    <ListItemGraphic graphic={<MaterialIcon icon={item.icon}/>}/>
                                    <ListItemText primaryText={item.title}/>
                                </NavLink>
                            </ListItem>)
                        }
                    </List>
                    <ListDivider tag={'div'}/>
                    <List>
                        {
                            lists.map(item => <ListItem style={{marginBottom: '10px'}} key={item.id}>
                                <NavLink to={`/${item.id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                                    <ListItemGraphic graphic={<MaterialIcon icon={'list'}/>}/>
                                    <ListItemText primaryText={item.title}/>
                                </NavLink>
                            </ListItem>)
                        }
                    </List>
                </ListGroup>
            </DrawerContent>
            {/*<Divider orientation={'vertical'}/>*/}
        </div>
    )
})


export default AppDrawer;