import React, { Component } from 'react'

import {
  View,
  Image,
  Dimensions
} from 'react-native';


class Mapa extends Component {

 render(){
 return (
    <View>
        <Image style={{width:largura*1.3, height:altura*1.15}}source={require('../images/mapa.png')}/>
    </View>
    ) 
  }
}
const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

export default Mapa