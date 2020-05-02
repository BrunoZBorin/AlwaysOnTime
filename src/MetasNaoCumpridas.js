import React, { Component } from 'react'
import axios from 'axios';
import api from './services/api'

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

class MetasNaoCumpridas extends Component {
    state={
        data:[{id:'0',
                    titulo:'Emagrecer',
                    descricao:'Emagrecer 5 ks',
                    prazo:'20/05/2020'},
             {id:'1',
                    titulo:'Estudar',
                    descricao:'Fazer 5 cursos',
                    prazo:'25/06/2020'},
            {id:'2',
                    titulo:'PC Gamer',
                    descricao:'Adquirir um PC Gamer',
                    prazo:'05/08/2020'}],
        counter:0
      }
async componentDidMount(){
  console.log('AQQQQQUUUUIIIIII');
  this.loadProducts();
}
loadProducts = async () => {
  const response = await api.get('/products');
  const { docs } = response.data;
  this;this.setState({ counter:docs.length});
  console.log(docs);
}
      
render(){        
  return (
    <View style={styles.container}>
          <Text style={{fontSize:30}}>{this.state.counter}</Text>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{flexDirection:'row', marginTop:30, justifyContent:'flex-start'}}>
                  <Image style={{height:30, width:30, marginRight:30}}source={require('../images/estrelaCheiaDourada.png')}/>
                    <View style={{marginRight:20}}>
                      <Text style={{fontWeight:'bold'}}> Meta {item.id}: {item.titulo}</Text>
                      <Text>{item.descricao}</Text>
                      <Text>{item.prazo}</Text>
                    </View>
                </View>
                );
              }}
          />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DefinaSuaMeta')}>
                    <View style = {{backgroundColor: '#33cc33', alignItems: 'center', marginRight:15, marginTop:70,
                        justifyContent: 'center', width:largura*.8, height:altura*.05}}>
                        <Text style = {{color: 'white'}}>Gravar</Text>
                    </View>
          </TouchableOpacity>
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