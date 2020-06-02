import React,{Component} from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/Menu'
import SideMenu from './src/SideMenu'
import Imagem from './src/Imagem'
import Mapa from './src/Mapa'
import ConcluindoMeta from './src/ConcluindoMeta'
import DefinaSuaMeta from './src/DefinaSuaMeta'
import MetasNaoCumpridas from './src/MetasNaoCumpridas'
import Metas_dia from './src/Metas_dia'
import Metas_mes from './src/Metas_mes'
import Metas_semana from './src/Metas_semana'
import EditarMeta from './src/EditarMeta'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import Login from './src/Login';
import DrawerNavigator from './DrawerNavigator';
import api from './src/services/api';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '470612423759-cbkibnq7eom10lfqcvm8mvupp0c6l6at.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

function HomeScreen({ navigation, _this }) {
  signIn = async () => {
    try
    {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      var objAux = {
        idtoken: userInfo["idToken"],
        nome: userInfo["user"]["name"],
        email: userInfo["user"]["email"]
      }
      await api.get('usuario', {params:objAux}).then((response) => {
          if(response.data.retorno == "OK") {
            console.log(response.data)
            navigation.navigate('Menu')
          }
          else
          {                       
            alert("Erro ao logar.");
          }
      }).catch(error => {
        alert("Erro ao logar.");
      });
    }
    catch (error)
    {
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
      {
        alert("Play Services not available or outdated")// play services not available or outdated
      }
      else
      {
        console.log(error)// some other error happened
      }
    }
  };

  state = {
    isSigninInProgress:null
  }

  const largura = Dimensions.get('screen').width;
  const altura = Dimensions.get('screen').height;

  return (
    <View style={{height:altura, backgroundColor:'#000000', justifyContent:'center', alignItems:'center' }}>
      
      <ImageBackground source={require('./images/lontra.png')} style={{width:largura, height:400, position:'absolute', top:-50}}/>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
        disabled={state.isSigninInProgress}
      /> 
      
    </View>
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
          options={{ title: 'Upload Imagem',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="Mapa" component={Mapa}
          options={{ title: 'Mapa',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }} />
        <Stack.Screen name="ConcluindoMeta" component={ConcluindoMeta}
          options={{ title: 'Concluindo Meta',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="DefinaSuaMeta" component={DefinaSuaMeta}
          options={{ title: 'Defina sua Meta',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="MetasNaoCumpridas" component={MetasNaoCumpridas}
          options={{ title: 'Metas Não Cumpridas',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="Metas_dia" component={Metas_dia}
          options={{ title: 'Metas para Hoje',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="Metas_semana" component={Metas_semana}
          options={{ title: 'Metas para semana',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="Metas_mes" component={Metas_mes}
          options={{ title: 'Metas para mes',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="Login" component={Login}
          options={{ title: 'Login',headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="Menu" component={Menu}
          options={{ title: "Menu",headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="SideMenu" component={SideMenu}
          options={{ title: "SideMenu",headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>
        <Stack.Screen name="EditarMeta" component={EditarMeta}
          options={{ title: "EditarMeta",headerStyle: { backgroundColor: '#000000'},headerTintColor:'#FFFFFF' }}/>

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