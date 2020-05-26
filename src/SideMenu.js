import React, { Component } from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import ConcluindoMeta from './ConcluindoMeta'
import DefinaSuaMeta from './DefinaSuaMeta'
import Metas_semana from './Metas_semana'
import Metas_dia from './Metas_dia'
import Metas_mes from './Metas_mes'
import Menu from './Menu'
import Imagem from './Imagem'
import Mapa from './Mapa'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
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
class SideMenu extends Component {

      
render(){        
  return (
   <Side_Menu/>
    
    )
  }
}
const DrawerNavigator = createDrawerNavigator({

Todas:{
    screen:()=><Menu/>,
},
Definindo :{
    screen:()=><DefinaSuaMeta  navigation={this.props.navigation}/>,
    
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
  
}
})
const Side_Menu = createAppContainer(DrawerNavigator);

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center"
    }
  })
  export default SideMenu;