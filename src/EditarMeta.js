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
} from 'react-native';

class EditarMeta extends Component {
    state={
        data:[]
    }

componentDidMount = async () => {
    const item = this.props.navigation.getParam('item')
    console.log('edit aaaaaaa ')
    this.setState({data:item})
    Alert.alert(this.state.data.titulo)
}
Cumprida(){
    Alert.alert('Parabéns, Esta tarefa foi cumprida!!!')
    this.props.navigation.navigate('MetasNaoCumpridas')
}

      
render(){         
  return (
    <View style={styles.container}>
      
          
                
                <View style={{width:largura*0.9, height:2, backgroundColor:'black'}}/>
                <View style={{flexDirection:'row', marginTop:30, justifyContent:'flex-start'}}>
                  <Image style={{height:30, width:30, marginRight:30}}source={require('../images/estrelaCheiaDourada.png')}/>
                    <View style={{marginRight:20}}>
                      <Text style={{fontWeight:'bold'}}> Meta: {this.state.data.titulo}  </Text>
                      <Text style={{fontWeight:'bold'}}> Prazo: {this.state.data.prazo}</Text>
                      <Text style={{marginBottom:20}}>Descrição {this.state.data.descricao}</Text>
                    </View>
                </View>
          <View style={{width:largura*0.9, height:2, backgroundColor:'black'}}/>
          <TouchableOpacity onPress={()=>this.Cumprida() }>
            <View style = {{backgroundColor: 'brown', alignItems: 'center', marginRight:15, marginTop:70, marginBottom:20,
                justifyContent: 'center', width:largura*.8, height:altura*.05}}>
                <Text style = {{color: 'black'}}>Cumprida</Text>
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
  export default EditarMeta
  /*nomeDoCard.propTypes = {
    navigation: String,
  }*/