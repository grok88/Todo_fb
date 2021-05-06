import React from 'react';

const AppContent: React.FC = React.memo((props) =>{
    return (
        <main {...props}/>
    );
})

export default AppContent;