import React from 'react';
import { createDrawerNavigator }  from 'react-navigation';
import ConcluindoMeta from './src/ConcluindoMeta'
import DefinaSuaMeta from './src/DefinaSuaMeta'
import MetasNaoCumpridas from './src/MetasNaoCumpridas'
import Metas_dia from './src/Metas_dia'

export default createDrawerNavigator({
    
        ConcluindoMeta:{
                screen:()=><ConcluindoMeta/>,
                navigationOptions: {title: "Concluindo Meta"}
            },
       

}, {drawerWidth:300 })