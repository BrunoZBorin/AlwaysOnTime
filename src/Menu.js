import React, { Component } from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import ConcluindoMeta from './ConcluindoMeta'
import DefinaSuaMeta from './DefinaSuaMeta'
import Metas_semana from './Metas_semana'
import Metas_dia from './Metas_dia'
import Metas_mes from './Metas_mes'
import Nao_Cumpridas from './MetasNaoCumpridas'
import Imagem from './Imagem'
import Mapa from './Mapa';
import { useNavigation } from '@react-navigation/native';
import api from './services/api';
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

class Menu extends Component {
  state = {
      metadia: [],
      metasemana: [],
      metames: []
  }

  componentDidMount(){
    this.getMetaDiaria();
    this.getMetaSemana();
    this.getMetaMes();
  }

getMetaDiaria = async () => {
  var dt = new Date();

  const currentUser = await GoogleSignin.getCurrentUser();

  var datainicio = dt.getFullYear() + "-" + (String(dt.getMonth()+1).length == 1 ? "0"+String(dt.getMonth()+1) : (dt.getMonth()+1)) + "-" + dt.getDate();
  var datafim = dt.getFullYear() + "-" + (String(dt.getMonth()+1).length == 1 ? "0"+String(dt.getMonth()+1) : (dt.getMonth()+1)) + "-" + dt.getDate();

  var condicao = " AND prazo >= '" + datainicio + "' AND prazo <= '" + datafim + "' ORDER BY prazo DESC LIMIT 2";

  var objAux = {
    idtoken: currentUser["idToken"],
    condicao: condicao
  }

  await api.get('meta', { params: objAux }).then((response) => {
      if(response.data.retorno == "OK") {
        const res = response.data.dados;
        this.setState({counter:res.length, metadia:res})
      }
      else
      {                       
        console.log(response.data)
      }
  }).catch(error => {
      console.log(error)
  });
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

signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    this.setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
  this.props.navigation.navigate('Home')
};

getMetaMes = async () => {
  var dt = new Date();

  const currentUser = await GoogleSignin.getCurrentUser();

  var data = dt.getFullYear() + "-" + (String(dt.getMonth()+1).length == 1 ? "0"+String(dt.getMonth()+1) : (dt.getMonth()+1)) + "-%";

  var condicao = " AND prazo LIKE '" + data + "' ORDER BY prazo DESC LIMIT 2";

  var objAux = {
    idtoken: currentUser["idToken"],
    condicao: condicao
  }

  await api.get('meta', { params: objAux }).then((response) => {
      if(response.data.retorno == "OK") {
        const res = response.data.dados;
        this.setState({counter:res.length, metames:res})
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
          <Text style={{fontSize:26, paddingTop:"2%", color:"blue"}}>Metas para hoje</Text>
          <FlatList
            data={this.state.metadia}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ConcluindoMeta', {meta: item.id_meta})}>
                  <View style={{width:largura*0.9, height:1, backgroundColor:''}}/>
                  <View style={{flexDirection:'row', marginTop:20, justifyContent:'flex-start'}}>
                    <Image style={{height:30, width:30, marginRight:30}}source={require('../images/estrelaCheiaDourada.png')}/>
                      <View style={{marginRight:20}}>
                        <Text style={{fontWeight:'bold'}}>Meta {item.id}: {item.titulo}</Text>
                        <Text style={{marginBottom:20}}>Descrição {item.descricao}</Text>
                      </View>
                  </View>
                  </TouchableOpacity>
                );
              }
            }
          />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Metas_dia')}>
            <View style = {{backgroundColor: 'blue', alignItems: 'center', marginRight:15, marginTop:2,
                justifyContent: 'center', width:largura*.8, height:altura*.05}}>
                <Text style = {{color: 'white'}}>Ver Todas</Text>
            </View>
          </TouchableOpacity>
          <Text style={{fontSize:26, paddingTop:"2%", color:"blue"}}>Metas para semana</Text>
          <FlatList
            data={this.state.metasemana}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ConcluindoMeta', {meta: item.id_meta})}>
                  <View style={{width:largura*0.9, height:1, backgroundColor:''}}/>
                  <View style={{flexDirection:'row', marginTop:20, justifyContent:'flex-start'}}>
                    <Image style={{height:30, width:30, marginRight:30}}source={require('../images/estrelaCheiaDourada.png')}/>
                      <View style={{marginRight:20}}>
                        <Text style={{fontWeight:'bold'}}>Meta {item.id}: {item.titulo}</Text>
                        <Text style={{marginBottom:20}}>Descrição {item.descricao}</Text>
                      </View>
                  </View>
                  </TouchableOpacity>
                );
              }
            }
          />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Metas_semana')}>
            <View style = {{backgroundColor: 'blue', alignItems: 'center', marginRight:15, marginTop:2,
                justifyContent: 'center', width:largura*.8, height:altura*.05}}>
                <Text style = {{color: 'white'}}>Ver Todas</Text>
            </View>
          </TouchableOpacity>
          <Text style={{fontSize:26, paddingTop:"2%", color:"blue"}}>Metas para mês</Text>
          <FlatList
            data={this.state.metames}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ConcluindoMeta', {meta: item.id_meta})}>
                  <View style={{width:largura*0.9, height:1, backgroundColor:''}}/>
                  <View style={{flexDirection:'row', marginTop:20, justifyContent:'flex-start'}}>
                    <Image style={{height:30, width:30, marginRight:30}}source={require('../images/estrelaCheiaDourada.png')}/>
                      <View style={{marginRight:20}}>
                        <Text style={{fontWeight:'bold'}}>Meta {item.id}: {item.titulo}</Text>
                        <Text style={{marginBottom:20}}>Descrição {item.descricao}</Text>
                      </View>
                  </View>
                  </TouchableOpacity>
                );
              }
            }
          />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Metas_mes')}>
            <View style = {{backgroundColor: 'blue', alignItems: 'center', marginRight:15, marginTop:2,
                justifyContent: 'center', width:largura*.8, height:altura*.05}}>
                <Text style = {{color: 'white'}}>Ver Todas</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('DefinaSuaMeta')}
          style={{marginTop:20}}>
            <Image source={require('../images/botaoMais.png')} style={{height:70, width:70}}/>
            <Text style={{color: 'blue', left:-15}}>Adicionar Meta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.signOut() }>
            <View style = {{backgroundColor: '#bbbbc8', alignItems: 'center', marginRight:15, marginTop:70, marginBottom:20,
                justifyContent: 'center', width:largura*.8, height:altura*.05}}>
                <Text style = {{color: 'black'}}>Log Out</Text>
            </View>
          </TouchableOpacity>
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
});

export default Menu;