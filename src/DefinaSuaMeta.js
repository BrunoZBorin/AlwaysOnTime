import React, { Component, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';


const DefinaSuaMeta = ({navigation}) =>{
    

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    Alert.alert("A data escolhida é: ", date.toString());
    hideDatePicker();
  };
 return (
    <View style={styles.container}>
        <View style={styles.body}>
            <Text style={{marginTop:30}}>Titulo</Text>
            <TextInput
                style={{ width:largura*.8,height: 40, borderBottomColor: 'blue', borderBottomWidth: 1 }}
                
                placeholder={'titulo'}
            />
            <Text style={{marginTop:30}}>Descrição</Text>
            <TextInput
                style={{ width:largura*.8,height: 120, borderBottomColor: 'blue', borderBottomWidth: 1 }}
                
                placeholder={'Descrição'}
            />
        </View>
        <Text style={{marginTop:10, left:-10}}>Prazo</Text>
        <View>
        <TouchableOpacity onPress={showDatePicker}>
            <View style = {{backgroundColor: '#FF8000', alignItems: 'center', marginRight:15, marginTop:10,
            borderRadius:50,  justifyContent: 'center', width:largura*.4, height:altura*.05}}>
                    <Text style = {{color: 'white'}}>Escolha uma data</Text>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </TouchableOpacity>
        </View>
            <TouchableOpacity onPress={() => navigation.navigate('ConcluindoMeta')}>
                <View style = {{backgroundColor: '#33cc33', alignItems: 'center', marginRight:15, marginTop:70,
                     justifyContent: 'center', width:largura*.8, height:altura*.05}}>
                    <Text style = {{color: 'white'}}>Gravar</Text>
                </View>
            </TouchableOpacity>
    </View>
    ) 
  }


const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    
    body:{
      fontSize:20,
      alignContent:'flex-start'
    },
    container:{
      alignItems:'center',
      width:'100%',
      height:'100%',
      backgroundColor:'white'
    },
    image:{
      height:270,
      width:270
    }
});

export default DefinaSuaMeta