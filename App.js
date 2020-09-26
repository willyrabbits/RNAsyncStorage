import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const App = () => {

    const [inputTexto, setInputTexto] = useState('')
    const [nombreStorage, setNombreStorage] = useState('')

    useEffect(() => {
        getStorageData()
    }, [])

    const saveData = async () => {
        console.log('Input: ', inputTexto)
        if (inputTexto.trim() === '') {
            Alert.alert(
                "ERROR",
                "name is empty",
                ["sorry"]
            )
            return
        }
        try {
            await AsyncStorage.setItem('nombre', inputTexto)
            setNombreStorage(inputTexto)
        } catch (error) {
            console.warn(error)
        }
    }

    const getStorageData = async () => {
        try {
            const nombre = await AsyncStorage.getItem('nombre')
            console.log('Storaged data: ', nombre)
            setNombreStorage(nombre)
        } catch (error) {
            console.warn(error)
        }
    }

    const deleteData = async () => {
        try {
            await AsyncStorage.removeItem('nombre')
            setNombreStorage('')
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <>
            <View style={styles.container}>
                {nombreStorage ?
                    <Text>Hola: {nombreStorage}</Text>
                    : null
                }
                <TextInput
                    style={styles.input}
                    placeholder="whats your name"
                    placeholderTextColor="#777"
                    onChangeText={text => setInputTexto(text)}
                />
                <Button
                    title='SAVE'
                    color='#333'
                    onPress={() => saveData()}
                />
                {nombreStorage ?
                    <TouchableHighlight
                        style={styles.btnEliminar}
                        onPress={() => deleteData()}
                    >
                        <Text style={styles.txtEliminar}>Delete name &times;</Text>
                    </TouchableHighlight>
                    : null
                }
            </View>
        </>
    )
}

export default App

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
    btnEliminar: {
        backgroundColor: 'red',
        marginTop: 20,
        padding: 10
    },
    txtEliminar: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: 300
    }
})
