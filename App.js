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
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import Login from './src/Login'

function HomeScreen({ navigation }) {
  closeDrawer = () => {
    this.drawer._root.close()
};
openDrawer = () => {
    this.drawer._root.open()
};  
signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
  } catch (error) {
    console.log(erro)
  }
};


  state={
    isSigninInProgress:null
  }
  

  const largura = Dimensions.get('screen').width;
  const altura = Dimensions.get('screen').height;
  return (
       
    <Drawer>
    <Container>
    <Header>
        <Container style={{flexDirection: 'row'}}>
                <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="#fff" />
        </Container>
    </Header>
    <View style={{height:altura, backgroundColor:'#000000', justifyContent:'center', alignItems:'center' }}>
      <ImageBackground source={require('./images/lontra.png')} style={{width:largura, height:400, position:'absolute', top:-50}}/>
      <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={this.signIn}
      disabled={this.state.isSigninInProgress} /> 
      <TouchableOpacity onPress={() => navigation.navigate('MetasNaoCumpridas')}>
      <View style = {{backgroundColor: '#33cc33', alignItems: 'center', marginRight:15, marginTop:70,
          justifyContent: 'center', width:largura*.8, height:altura*.05}}>
          <Text style = {{color: 'white'}}>Gravar</Text>
      </View>
    </TouchableOpacity>
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
         <Stack.Screen name="Login" component={Login}
         options={{ title: 'Login',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>

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