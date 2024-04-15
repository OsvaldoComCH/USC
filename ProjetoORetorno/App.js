import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoList from './Components/ToDoList';
import TelaAddTarefa from "./Telas/AddTarefa";
import TelaLogin from './Telas/Login';
import TelaAddUser from './Telas/AddUser';
import firebase from './services/firebase';
import { getDatabase, ref, get, update, set, remove } from "firebase/database"

const Stack = createStackNavigator();
export default function App() {
	const [Tarefas, SetTarefas] = useState([
		{Nome: "BD", Descricao: "Bom Dia", Data: new Date(Date.now()), Completado: false},
		{Nome: "BT", Descricao: "Bom Tarde", Data: new Date(Date.now()), Completado: false},
		{Nome: "BN", Descricao: "Bom Noite", Data: new Date(Date.now()), Completado: false}
	]);
	function Deleta(IdTarefa)
	{
		SetTarefas(
			Tarefas.filter((item) => item.Id !== IdTarefa)
		);
	};
	function TrocaEstado(IdTarefa)
	{
		SetTarefas(
			Tarefas.map((item) => item.Id === IdTarefa ? {...item, Completado: !item.Completado} : item)
		);
	};
    function Add(Tarefa)
    {
		const database = getDatabase(firebase);
		var Id = Date.now().toString();
		const TarefaRef = ref(database, 'tarefas/' + Id);
		set(TarefaRef, {Nome: Tarefa.Nome, Descricao: Tarefa.Descricao, Data: Tarefa.Data, Completado: false})
		.then(() =>{
			SetTarefas(
				[...Tarefas, {Nome: Tarefa.Nome, Descricao: Tarefa.Descricao, Data: Tarefa.Data, Completado: false},]
			);
			console.log("Tarefa adicionada com sucesso.");
		})
		.catch((error) =>
		{
			console.error("Erro: ", error);
		})
    }
	return (
        <NavigationContainer>
            <Stack.Navigator>
				
                <Stack.Screen name="Home" options={{headerShown: false}}>
                    {() => (
                        <View style={styles.container}>
                            <View style={styles.Header}>
                                <Text style={styles.HeaderText}>Lista de Tarefas</Text>
                            </View>
                            <ToDoList Itens={Tarefas} TrocaEstado={TrocaEstado} Deleta={Deleta}/>
                        </View>
                    )}
                </Stack.Screen>
				<Stack.Screen
					options={{headerShown: false}}
					name="login"
					component={TelaLogin}
				/>
                <Stack.Screen
                    options={{headerShown: false}}
                    name="AddTarefa"
                    component={TelaAddTarefa}
                    initialParams={{AddTarefa: Add}}
                />
				<Stack.Screen
                    options={{headerShown: false}}
                    name="AddUser"
                    component={TelaAddUser}
                />
            </Stack.Navigator>
        </NavigationContainer>
	);
}
const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
		},
		Header: {
			backgroundColor: '#2020ff',
			alignItems: 'center',
			padding: 20,
		},
		HeaderText: {
			paddingTop: 20,
			color: '#fff',
      		fontSize: 24,
      		fontWeight: 'bold',
    	},
	}
);
