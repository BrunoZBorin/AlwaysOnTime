import React, { Component } from 'react'
import api from './services/api'
import MenuButton from './Components/MenuButton'
//import DrawerNavigator from '../DrawerNavigator';
import Navigator from '../Drawer';
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
  this.loadProducts();
}
loadProducts = async () => {
  const response = await api.get('/metas').then((response)=>{
    res = response.data.docs
    console.log(res)
    this.setState({counter:res.length,  
    data:res})
    
  }).catch((erro)=>{
    console.log(erro)
  });
}
      
render(){        
  return (
    <View style={styles.container}>
    
      <MenuButton navigation={this.props.navigation}/>      
      <ScrollView>
      
          <Text style={{fontSize:30}}>Total {this.state.counter}</Text>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
                <View style={{width:largura*0.9, height:2, backgroundColor:'black'}}/>
                <View style={{flexDirection:'row', marginTop:30, justifyContent:'flex-start'}}>
                  <Image style={{height:30, width:30, marginRight:30}}source={require('../images/estrelaCheiaDourada.png')}/>
                    <View style={{marginRight:20}}>
                      <Text style={{fontWeight:'bold'}}> Meta {item.id}: {item.titulo}</Text>
                      <Text style={{marginBottom:20}}>Descrição {item.descricao}</Text>
                    </View>
                </View>
                </TouchableOpacity> 
                );
              }}
          />
          <View style={{width:largura*0.9, height:2, backgroundColor:'black'}}/>
          <Navigator/>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Metas_dia')}>
                    <View style = {{backgroundColor: '#33cc33', alignItems: 'center', marginRight:15, marginTop:70,
                        justifyContent: 'center', width:largura*.8, height:altura*.05}}>
                        <Text style = {{color: 'white'}}>Gravar</Text>
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
  export default MetasNaoCumpridas