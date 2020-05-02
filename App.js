import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Imagem from './src/Imagem'
import Mapa from './src/Mapa'
import ConcluindoMeta from './src/ConcluindoMeta'
import DefinaSuaMeta from './src/DefinaSuaMeta'
import MetasNaoCumpridas from './src/MetasNaoCumpridas'


function HomeScreen({ navigation }) {


  const largura = Dimensions.get('screen').width;
  const altura = Dimensions.get('screen').height;
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;