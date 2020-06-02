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

class MetasNaoCumpridas extends Component {
    state={
        data:[]
    }
componentDidMount(){
  this.getMeta();
}
getMeta = async () => {
  var dt = new Date();

  const currentUser = await GoogleSignin.getCurrentUser();

  var data = dt.getFullYear() + "-" + (String(dt.getMonth()+1).length == 1 ? "0"+String(dt.getMonth()+1) : (dt.getMonth()+1)) + "-%";

  var condicao = "";

  var objAux = {
    idtoken: currentUser["idToken"],
    condicao: condicao
  }

  await api.get('meta', { params: objAux }).then((response) => {
      if(response.data.retorno == "OK") {
        const res = response.data.dados;
        console.log('AQUI');
        console.log(res);
        this.setState({counter:res.length, data:res})
      }
      else
      {                       
        console.log(response.data)
      }
  }).catch(error => {
      console.log(error)
  });
}

      
render(){        
  return (
    <View style={styles.container}>
      <ScrollView>
          <Text style={{fontSize:30}}>Total {this.state.counter}</Text>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={()=>this.props.navigation.replace('EditarMeta',{item})}>
                <View style={{width:largura*0.9, height:2, backgroundColor:'black'}}/>
                <View style={{flexDirection:'row', marginTop:30, justifyContent:'flex-start'}}>
                  <Image style={{height:30, width:30, marginRight:30}}source={require('../images/estrelaCheiaDourada.png')}/>
                    <View style={{marginRight:20}}>
                      <Text style={{fontWeight:'bold'}}> Meta {item.id}: {item.titulo}</Text>
                      <Text style={{fontWeight:'bold'}}> Prazo: {item.prazo}</Text>
                      <Text style={{marginBottom:20}}>Descrição {item.descricao}</Text>
                    </View>
                </View>
                </TouchableOpacity> 
                );
              }}
          />
          <View style={{width:largura*0.9, height:2, backgroundColor:'black'}}/>
          
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
  export default MetasNaoCumpridas