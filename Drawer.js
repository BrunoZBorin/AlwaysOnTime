import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import ConcluindoMeta from './src/ConcluindoMeta'
import DefinaSuaMeta from './src/DefinaSuaMeta'
import MetasNaoCumpridas from './src/MetasNaoCumpridas'
import Metas_dia from './src/Metas_dia'
import Metas_semana from './src/Metas_semana'
import DrawerNavigator from './DrawerNavigator';


const RootDrawerNavigator = createDrawerNavigator(
    {
        Concluindo :{
            screen:DrawerNavigator
            
        },
        /*Definindo :{
            screen:DefinaSuaMeta,
            
        },
        Dia :{
            screen:Metas_dia,
            
        },
        Semana :{
            screen:Metas_semana,
            
        },*/
    },
);
export default createAppContainer(RootDrawerNavigator);

