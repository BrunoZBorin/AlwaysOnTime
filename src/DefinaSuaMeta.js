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

export default function DefinaSuaMeta({navigation}) {
  const [titulo, onChangeTextTitulo] = React.useState('');
  const [descricao, onChangeTextDescricao] = React.useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  gravar = async () =>{
    if(titulo.trim() == "")
      return alert("Informe o título.");
    if(String(date).trim() == "")
      return alert("Informe o prazo.");

    const currentUser = await GoogleSignin.getCurrentUser();

    let data = date.getFullYear() + "-" + (String(date.getMonth()+1).length == 1 ? "0"+String(date.getMonth()+1) : (date.getMonth()+1)) + "-" + (String(date.getDate()).length == 1 ? "0"+String(date.getDate()) : (date.getDate()));
    
    var objAux = {
      idtoken: currentUser["idToken"],
      prazo: data,
      descricao: descricao,
      titulo: titulo
    }
  
    await api.get('meta/gravar', {params:objAux}).then((response) => {
        if(response.data.retorno == "OK") {
          navigation.navigate('Menu')
        }
        else
        {                       
          console.log(response.data)
        }
    }).catch(error => {
        console.log(error)
    });
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={{marginTop:30}}>Título</Text>
        <TextInput
          style={{width:largura*.8, height: 40, borderBottomColor: 'blue', borderBottomWidth: 1}}
          onChangeText={text => onChangeTextTitulo(text)}
          value={titulo}
        />
        <Text style={{marginTop:30}}>Descrição</Text>
        <TextInput
          style={{width:largura*.8, height: 120, borderBottomColor: 'blue', borderBottomWidth: 1}}
          onChangeText={text => onChangeTextDescricao(text)}
          value={descricao}
        />

        <Text style={{marginTop:30}}>Prazo</Text>
        <View>
          <Button onPress={showDatepicker} title={(String(date.getDate()).length == 1 ? "0"+String(date.getDate()) : (date.getDate())) + "/" + (String(date.getMonth()+1).length == 1 ? "0"+String(date.getMonth()+1) : (date.getMonth()+1)) + "/" + date.getFullYear()} />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View style={{flexDirection:'row', marginTop:80}}>
            <TouchableOpacity onPress={() => navigation.navigate('Imagem')}>
                <View style = {{backgroundColor: '#0099ff', alignItems: 'center', 
                  justifyContent: 'center', width:largura*.4, height:altura*.05, marginRight:15}}>
                <Text style = {{color: 'white'}}>Adicionar Imagem</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
                <View style = {{backgroundColor: '#0099ff', alignItems: 'center', marginRight:15,
                  justifyContent: 'center', width:largura*.4, height:altura*.05}}>
                <Text style = {{color: 'white'}}>Adicionar Localização</Text>
                </View>
            </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={()=>this.gravar()}>
          <View style = {{backgroundColor: '#33cc33', alignItems: 'center', marginRight:0, marginTop:60, marginBottom:20,
              justifyContent: 'center', width:largura*.8, height:altura*.05}}>
              <Text style = {{color: 'white'}}>Gravar</Text>
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