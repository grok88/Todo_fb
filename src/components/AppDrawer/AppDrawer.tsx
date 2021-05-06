import React from 'react';
// import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from 'mdc-react';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {DrawerContent, DrawerHeader, DrawerTitle,} from '@material/react-drawer';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';

const AppDrawer: React.FC = React.memo(() => {
    console.log('AppDrawer');
    return (
        <Drawer className={'app-drawer'}>
            <DrawerHeader>
                <DrawerTitle tag='h2'>
                    React Todo
                </DrawerTitle>
            </DrawerHeader>
            <DrawerContent tag='main'>
                <List>
                    {
                        [
                            {title: 'Задачи', icon: 'home'},
                            {title: 'Важно', icon: 'star'},
                            {title: 'Запланированные', icon: 'event'},
                        ].map(item => <ListItem style={{marginBottom:'10px'}}>
                            <ListItemGraphic graphic={<MaterialIcon icon={item.icon}/>}/>
                            <ListItemText primaryText={item.title}/></ListItem>)
                    }
                </List>
            </DrawerContent>
        </Drawer>
    )
})


export default AppDrawer;