import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import Marmotinha from '../images/marmotinha.png'
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


class ConcluindoMeta extends Component {
    
  
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
  
 render(){
    
 return (
    <View style={styles.container}>
        <Text style={styles.title}>Concluiu sua meta?</Text>
        <Image style={styles.image} source={Marmotinha}/>
        <View style={{flexDirection:'row', marginTop:80}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Imagem')}>
                <View style = {{backgroundColor: '#0099ff', alignItems: 'center', 
                  justifyContent: 'center', width:largura*.4, height:altura*.05, marginRight:15}}>
                <Text style = {{color: 'white'}}>Adicionar Imagem</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Mapa')}>
                <View style = {{backgroundColor: '#0099ff', alignItems: 'center', marginRight:15,
                  justifyContent: 'center', width:largura*.4, height:altura*.05}}>
                <Text style = {{color: 'white'}}>Adicionar Localização</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', marginTop:80}}>
            <TouchableOpacity onPress={() => navigation.navigate('ConcluindoMeta')}>
                <View style = {{backgroundColor: '#ff0000', alignItems: 'center', 
                  justifyContent: 'center', width:largura*.4, height:altura*.05, marginRight:15}}>
                <Text style = {{color: 'white'}}>Não</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ConcluindoMeta')}>
                <View style = {{backgroundColor: '#33cc33', alignItems: 'center', marginRight:15,
                  justifyContent: 'center', width:largura*.4, height:altura*.05}}>
                <Text style = {{color: 'white'}}>Sim</Text>
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

export default ConcluindoMeta