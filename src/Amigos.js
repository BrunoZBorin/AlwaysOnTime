import React, { Component } from 'react'
import api from './services/api'
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

class Amigos extends Component {
  idusuario = "";
    state={
        data:[]
    }
componentDidMount(){
  this.getAmigos();
}
getAmigos = async () => {
  var dt = new Date();

  var objAux = {
    idusuario: this.props.route.params.idusuario
  }

  await api.get('usuario/amigos', { params: objAux }).then((response) => {
      if(response.data.retorno == "OK") {
        const res = response.data.dados;
        this.setState({counter:res.length, data:res})
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
      <ScrollView>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetalhesAmigo', {idamigo: item.id_amigo, idusuario: this.props.route.params.idusuario, nome: item.nome, email: item.email})}>
                <View style={{width:largura*0.9, height:2, backgroundColor:'black'}}/>
                <View style={{flexDirection:'row', marginTop:30, justifyContent:'flex-start'}}>
                    <View style={{marginRight:20, marginBottom:10}}>
                      <Text style={{fontWeight:'bold'}}> Nome: {item.nome}</Text>
                      <Text style={{fontWeight:'bold'}}> Email: {item.email}</Text>
                    </View>
                </View>
                </TouchableOpacity> 
                );
              }}
          />
          <View style={{width:largura*0.9, height:2, backgroundColor:'black'}}/>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('DefinaUmAmigo', {idusuario: this.props.route.params.idusuario})}>
            <View style = {{backgroundColor: '#33cc33', alignItems: 'center', marginTop:30,
                justifyContent: 'center', width:largura*.9, height:altura*.05}}>
                <Text style = {{color: 'white'}}>Adicionar Amigo</Text>
            </View>
          </TouchableOpacity>
          
        </ScrollView>
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
  export default Amigos