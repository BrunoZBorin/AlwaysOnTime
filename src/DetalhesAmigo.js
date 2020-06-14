import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import Marmotinha from '../images/marmotinha.png';
import api from './services/api';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Picker,
  Alert,
} from 'react-native';


class DetalhesAmigo extends Component {
  meta = "";
  
  Next=()=>{
    this.props.navigation.navigate('Perfil')
  }
  storeLogin = async()=> {
    const userNome = this.state.nome
    try {
      await AsyncStorage.setItem('userNome', userNome);
    } catch (error) {
      Alert.alert(error.message);
    }
    
    this.props.navigation.navigate('Perfil')
    
  };

  deletarAmigo = async()=> {
    const currentUser = await GoogleSignin.getCurrentUser();
    
    var objAux = {
      idtoken: currentUser["idToken"],
      idamigo: this.props.route.params.idamigo,
      idusuario: this.props.route.params.idusuario
    }
  
    await api.get('usuario/amigos/apagar', {params:objAux}).then((response) => {
        if(response.data.retorno == "OK") {
          this.props.navigation.navigate('Menu');
        }
        else
        {                       
          alert(response.data)
        }
    }).catch(error => {
        alert(error)
    });
  }
  
 render(){
    
 return (
    <View style={styles.container}>
      <Text style={{marginTop:10}}></Text>
        <Text style={styles.title}>{this.props.route.params.nome}</Text>
        <Text style={{marginTop:10, fontSize:16}}>{this.props.route.params.email}</Text>
        <View style={{flexDirection:'row', marginTop:30}}>
            <TouchableOpacity onPress={this.deletarAmigo}>
                <View style = {{backgroundColor: '#ff0000', alignItems: 'center', marginRight:15,
                  justifyContent: 'center', width:largura*.9, height:altura*.05}}>
                <Text style = {{color: 'white'}}>Deletar</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
    ) 
  }
}

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    header:{
      fontSize:24,
      margin:10,
      color:'blue'
    },
    title:{
      fontSize:26,
      color:'blue',
      fontWeight:'bold'
    },
    container:{
      alignItems:'center',
      width:'100%',
      height:'100%',
      backgroundColor:'white'
    },
    image:{
      height:270,
      width:270
    }
});

export default DetalhesAmigo