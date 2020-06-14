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
class Metas_semana extends Component {


  state = {
    metasemana:[]
  }

componentDidMount(){
  this.getMetaSemana();
}

getMetaSemana = async () => {
  var dt = new Date();

  const currentUser = await GoogleSignin.getCurrentUser();

  var datainicio = dt.getFullYear() + "-" + (String(dt.getMonth()+1).length == 1 ? "0"+String(dt.getMonth()+1) : (dt.getMonth()+1)) + "-" + dt.getDate();
  var datafim = dt.getFullYear() + "-" + (String(dt.getMonth()+1).length == 1 ? "0"+String(dt.getMonth()+1) : (dt.getMonth()+1)) + "-" + (Number(dt.getDate()) + 7);

  var condicao = " AND prazo >= '" + datainicio + "' AND prazo <= '" + datafim + "' ORDER BY prazo DESC LIMIT 2";

  var objAux = {
    idtoken: currentUser["idToken"],
    condicao: condicao
  }

  await api.get('meta', { params: objAux }).then((response) => {
      if(response.data.retorno == "OK") {
        const res = response.data.dados;
        for(var i in res){
          res[i].prazo = res[i].prazo.split('-').reverse().join('/');
        }
        this.setState({counter:res.length, metasemana:res})
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
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={this.state.metasemana}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ConcluindoMeta', {meta: item.id_meta})}>
                <View style={{width:largura*0.9, height:1, backgroundColor:''}}/>
                <View style={{flexDirection:'row', marginTop:30, justifyContent:'flex-start'}}>
                  <Image style={{height:30, width:30, marginRight:30}}source={require('../images/estrelaCheiaDourada.png')}/>
                    <View style={{marginRight:20}}>
                      <Text style={{fontWeight:'bold'}}>Meta {item.id}: {item.titulo}</Text>
                      <Text style={{fontWeight:'bold'}}>Prazo: {item.prazo}</Text>
                      <Text style={{marginBottom:20}}>Descrição {item.descricao}</Text>
                    </View>
                </View>
                </TouchableOpacity>
                );
              }}
          />
        </View>
      </ScrollView>
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
export default Metas_semana