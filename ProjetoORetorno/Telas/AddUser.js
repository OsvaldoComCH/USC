import React, {useState} from "react";
import {View, TextInput, Text, Button, StyleSheet} from 'react-native';
import firebase from '../services/firebase.js'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default function TelaAddUser({navigation})
{
    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');
    const [CreateFail, SetCreateFail] = useState(false);

    function Registrar()
    {
        const Auth = getAuth();
        createUserWithEmailAndPassword(Auth, Email, Password).then(
            (userCredential) =>
            {
                console.log("Usuário criado com sucesso: ", userCredential.user.email);
                SetCreateFail(false);
                navigation.navigate("Login");
            }
        ).catch(
            (error) =>
            {
                console.error("erro: ", error.message);
                SetCreateFail(true);
            }
        )
    }
    return(
        <View style={styles.container}> 
            {CreateFail && <Text style={styles.CreateFail}>Falha ao criar usuário</Text>}
            <TextInput
                placeholder="E-mail"
                value={Email}
                onChangeText={(text) => SetEmail(text)}
                style={styles.Input}
            />
            <TextInput
                placeholder="Senha"
                value={Password}
                onChangeText={(text) => SetPassword(text)}
                secureTextEntry={true}
                style={styles.Input}
            />
            <Button title="Registrar" onPress={Registrar}/>
        </View>
    );
}
const styles = StyleSheet.create(
	{
		container:
        {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
        Input: 
        {
            width: '80%',
            height: 40,
            borderColor: '#808080',
            borderWidth: 1,
            marginBottom: 10,
            padding: 10,
        },
        CreateFail:
        {
            color: 'red',
        }
	}
);
