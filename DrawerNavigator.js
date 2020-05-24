import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import ConcluindoMeta from './src/ConcluindoMeta'
import DefinaSuaMeta from './src/DefinaSuaMeta'
import MetasNaoCumpridas from './src/MetasNaoCumpridas'
import Metas_dia from './src/Metas_dia'
import Metas_semana from './src/Metas_semana'
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, StyleSheet} from 'react-native';


const largura = Dimensions.get('screen').width;

const DrawerConfig = {
   // drawerWidth: largura*0.80,
}

const DrawerNavigator = createDrawerNavigator(
    {
        Concluindo :{
            screen:ConcluindoMeta,
            navigationOptions:{
                title:'Concluindo'
            }
        },
        Definindo :{
            screen:DefinaSuaMeta,
            navigationOptions:{
                title:'Definindo'
            }
        },
        Dia :{
            screen:Metas_dia,
            navigationOptions:{
                title:'Dia'
            }
        },
        Semana :{
            screen:Metas_semana,
            navigationOptions:{
                title:'Semana'
            }
        },
    },
    DrawerConfig
);
export default createAppContainer(DrawerNavigator);
