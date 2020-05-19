import React, { useState, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

const App = () => {

  const [inputText, setInputText] = useState('')
  const [nameStorage, setNameStorage] = useState('')

  useEffect(() => {
    getDataStorage()
  }, [])

  const setData = async () => {
    try {
      await AsyncStorage.setItem('name', inputText)
      setNameStorage(inputText)
    } catch (error) {
      console.log(error)
    }

  }

  const getDataStorage = async () => {
    try {
      const name = await AsyncStorage.getItem('name')
      setNameStorage(name)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('name')
      setNameStorage('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={styles.container}>

        {nameStorage ?
          <Text>Hola: {nameStorage}</Text>
          : null
        }

        <TextInput
          placeholder="Escribe tu nombre"
          style={styles.input}
          onChangeText={text => setInputText(text)}
        />

        <Button
          title="Guardar"
          color='#333'
          onPress={() => setData()}
        />
        {nameStorage ? (
          <TouchableHighlight
            onPress={() => deleteData()}
            style={styles.btnDelete}>
            <Text style={styles.txtDelete}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
        ) : null
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40
  },
  btnDelete: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  txtDelete: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  }
});

export default App;
