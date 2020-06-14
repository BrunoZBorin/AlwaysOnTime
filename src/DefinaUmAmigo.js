import React, {useState} from 'react';
import {Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native';
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

export default function DefinaUmAmigo({navigation}) {
  const [email, onChangeTextEmail] = React.useState('');

  const gravar = async () =>{
    if(email.trim() == "")
      return alert("Informe o email.");

    const currentUser = await GoogleSignin.getCurrentUser();
    
    var objAux = {
      idtoken: currentUser["idToken"],
      email: email
    }
    await api.get('usuario/amigos/gravar', {params:objAux}).then((response) => {
        if(response.data.retorno == "OK") {
          navigation.navigate('Menu')
        }
        else
        {                       
          alert(response.data)
        }
    }).catch(error => {
        alert(error)
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={{marginTop:30}}>Email</Text>
        <TextInput
          style={{width:largura*.8, height: 40, borderBottomColor: 'blue', borderBottomWidth: 1}}
          onChangeText={text => onChangeTextEmail(text)}
          value={email}
        />

        <TouchableOpacity onPress={()=>gravar()}>
          <View style = {{backgroundColor: '#33cc33', alignItems: 'center', marginRight:0, marginTop:60, marginBottom:20,
              justifyContent: 'center', width:largura*.8, height:altura*.05}}>
              <Text style = {{color: 'white'}}>Adicionar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );  
}

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  body:{
    fontSize:20,
    alignContent:'flex-start'
  },
  container: {
    alignItems: "center"
  }
})