import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Imagem from '../src/Imagem'
import Mapa from '../src/Mapa'
import ConcluindoMeta from '../src/ConcluindoMeta'
import DefinaSuaMeta from '../src/DefinaSuaMeta'
import MetasNaoCumpridas from './MetasNaoCumpridas'
import Metas_dia from '../src/Metas_dia'
import Metas_semana from '../src/Metas_semana'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';


import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView
} from 'react-native';


class Login extends Component {
    state={
      isSigninInProgress:null    
    }
    

signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
      
render(){ 
  
    
  const Stack = createStackNavigator();
  return (
    <View style={{height:altura, backgroundColor:'#000000', justifyContent:'center', alignItems:'center' }}>
      <ImageBackground source={require('../images/lontra.png')} style={{width:largura, height:400, position:'absolute', top:-50}}/>
      <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={this.signIn}
      disabled={this.state.isSigninInProgress} />       
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
      
      </View>
    )
        
  }
}

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center"
    }
  })

export default Login;


/*function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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

export default App;*/