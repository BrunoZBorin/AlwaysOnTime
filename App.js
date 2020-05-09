import React,{Component} from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Imagem from './src/Imagem'
import Mapa from './src/Mapa'
import ConcluindoMeta from './src/ConcluindoMeta'
import DefinaSuaMeta from './src/DefinaSuaMeta'
import MetasNaoCumpridas from './src/MetasNaoCumpridas'
import Metas_dia from './src/Metas_dia'
import Metas_semana from './src/Metas_semana'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Drawer, Container, Header, Content,Button } from 'native-base';
class SideBar extends Component {
    
    
    render(){
        
        return (
                <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
                        <Text>
                            <Icon name="rocket" size={30} color="#900" />
                            Conteúdo side bar
                        </Text>
                </View>
               );
    } 
};

function HomeScreen({ navigation }) {
  closeDrawer = () => {
    this.drawer._root.close()
};
openDrawer = () => {
    this.drawer._root.open()
};   


  const largura = Dimensions.get('screen').width;
  const altura = Dimensions.get('screen').height;
  return (
    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<SideBar navigator={this.navigator} />}
    onClose={() => this.closeDrawer()}>
    <Container>
    <Header>
        <Container style={{flexDirection: 'row'}}>
                <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="#fff" />
        </Container>
    </Header>
    <View style={{height:altura, backgroundColor:'#000000', justifyContent:'center', alignItems:'center' }}>
      <ImageBackground source={require('./images/lontra.png')} style={{width:largura, height:400, position:'absolute', top:-50}}/>
        <View style={{height:250, width:300, backgroundColor:'white', marginTop:50}}>
          <Text style={{fontSize:20, fontWeight:'bold', alignSelf:'center', marginTop:15}}>Set your e-mail to sign in</Text>
          <View style={{flexDirection:'row', alignContent:"space-between", marginTop:170}}>
            <View style={{left:10}}>
              <TouchableOpacity>
                <Text style={{color:'red', fontSize:20}}>CANCEL</Text>
              </TouchableOpacity>
            </View>
            <View style={{ right:-120}}>
              <TouchableOpacity onPress={() => navigation.navigate('MetasNaoCumpridas')}>
                <Text style={{color:'blue', fontSize:20}}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      <View style={{marginTop:100}}>
        <Text style={{color:'white', fontSize:40}}>Bem Vindo</Text>
      </View>
    </View>
    </Container>
      </Drawer>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{ title: 'Login',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="Imagem" component={Imagem}  
        options={{ title: 'Concluindo Meta >> Imagem',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="Mapa" component={Mapa}
        options={{ title: 'Concluindo Meta >> Mapa',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }} />
        <Stack.Screen name="ConcluindoMeta" component={ConcluindoMeta}
         options={{ title: 'Concluindo Meta',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="DefinaSuaMeta" component={DefinaSuaMeta}
         options={{ title: 'Defina sua Meta',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
         <Stack.Screen name="MetasNaoCumpridas" component={MetasNaoCumpridas}
         options={{ title: 'Metas Não Cumpridas',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
         <Stack.Screen name="Metas_dia" component={Metas_dia}
         options={{ title: 'Metas para Hoje',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
         <Stack.Screen name="Metas_semana" component={Metas_semana}
         options={{ title: 'Metas para essa semana',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default App;