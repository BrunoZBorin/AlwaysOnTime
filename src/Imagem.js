import React, { Component } from 'react'

import {
  View,
  Image,
  Dimensions
} from 'react-native';


class Imagem extends Component {

 render(){
 return (
    <View>
        <Image style={{width:largura*1.5, height:altura*1.5, top:-100, left:-100}}source={require('../images/Foto.png')}/>
    </View>
    ) 
  }
}
const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

export default Imagem