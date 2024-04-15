import React, {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, Pressable} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import firebase from "../services/firebase"

export default function TelaLogin({ navigation })
{
    const Nav = useNavigation()
    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');
    const [LoginFail, SetLoginFail] = useState(false);

    const HandleLogin = async () =>
    {
        const Auth = getAuth();
        signInWithEmailAndPassword(Auth, Email, Password)
        .then((userCredential) =>{
                SetLoginFail(false);
                console.log("Login realizado com sucesso: ", userCredential.user.email);
                Nav.navigate("Home");
            }
        ).catch(
            (error) =>
            {
                SetLoginFail(true);
                console.error("erro: ", error.message);
            }
        )
    }
    return(
        <View style={styles.container}> 
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Lista de Tarefas</Text>
            </View>
            <View style={styles.container2}>
                <Text style={styles.HeaderText2}>Login</Text>
                {LoginFail && <Text style={styles.LoginFail}>Usuário ou senha inválidos</Text>}
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
                    secureTextEntry
                    style={styles.Input}
                />
                <Button title="login" onPress={HandleLogin}/>
                <Pressable onPress={() =>{Nav.navigate("AddUser")}}>
                    <Text style={styles.Register}>Register Novo Usuário</Text>
                </Pressable>
            </View>
        </View>
    );
}
const styles = StyleSheet.create(
	{
        Register:
        {
            textDecorationLine: 'underline',
            color: 'blue',
        },
		container: 
        {
			flex: 1,
		},
		container2:
        {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		Header:
        {
			backgroundColor: '#2020ff',
			alignItems: 'center',
			padding: 20,
		},
		HeaderText:
        {
			paddingTop: 20,
			color: '#fff',
      		fontSize: 24,
      		fontWeight: 'bold',
    	},
		HeaderText2:
        {
      		fontSize: 24,
      		marginBottom: 20,
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
        LoginFail:
        {
            color: 'red',
        }
	}
);
