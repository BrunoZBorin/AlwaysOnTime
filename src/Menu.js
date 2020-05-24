import React, { Component } from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import ConcluindoMeta from './ConcluindoMeta'
import DefinaSuaMeta from './DefinaSuaMeta'
import Metas_semana from './Metas_semana'
import Metas_dia from './Metas_dia'
import Metas_mes from './Metas_mes'
import Nao_Cumpridas from './MetasNaoCumpridas'
import Imagem from './Imagem'
import Mapa from './Mapa'

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from 'react-native';
class Menu extends Component {

      
render(){        
  return (    
    <SideMenu/>
    )
  }
}
const DrawerNavigator = createDrawerNavigator({
  
Definindo :{
    screen:DefinaSuaMeta,
    
},
Concluindo :{
  screen:ConcluindoMeta
  
},
Mes :{
    screen:Metas_mes,
    
},
Semana :{
  screen:Metas_semana,
  
},
Dia :{
  screen:Metas_dia,
  
},
Foto :{
  screen:Imagem,
  
},
Mapa :{
  screen:Mapa,
  
},
Não_Cumpridas :{
  screen:Nao_Cumpridas,
  
}
})
const SideMenu = createAppContainer(DrawerNavigator);

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center"
    }
  })
  export default Menu;