import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
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
	const [Tarefas, SetTarefas] = useState([ ]);

	useEffect(() =>{
		const database = getDatabase(firebase);
		const TarefaRef = ref(database, 'tarefas');
		get(TarefaRef)
		.then((snapshot) =>
		{
			if(snapshot.exists())
			{
				const DB = snapshot.val();
				for(Id in DB)
				{
					SetTarefas((Tarefas) =>
					[
						...Tarefas,
						{
							Id: Id,
							Tarefa: {...DB[Id].Tarefa, Data: new Date(DB[Id].Tarefa.Data)}, 
							Completado: DB[Id].Completado
						},
					]);
				}
			}else
			{
				console.log("Nenhum dado encontrado");
			}
		})
		.catch((error) =>
			console.log("Erro:", error)
		);
	}, []);

	function Deleta(IdTarefa)
	{
		const database = getDatabase(firebase);
		const TarefaRef = ref(database, 'tarefas/' + IdTarefa.toString());
		remove(TarefaRef)
		.then(() =>{
			SetTarefas((Tarefas) =>
				{
					let NT = Tarefas.filter((item) => item.Id !== IdTarefa)
					return NT
				}
			);
			console.log("Tarefa excluida com sucesso.");
		})
		.catch((error) =>
		{
			console.error("Erro: ", error);
		})
	};
	function TrocaEstado(IdTarefa)
	{
		const database = getDatabase(firebase);
		const TarefaRef = ref(database, 'tarefas/' + IdTarefa.toString());
		const T = Tarefas.find((item) => item.Id === IdTarefa)
		update(TarefaRef, {Completado: !T.Completado})
		.then(() =>{
			SetTarefas((Tarefas) =>
				{
					let NT = Tarefas.map((item) => 
					item.Id === IdTarefa ? {...item, Completado: !item.Completado} : item)
					return NT
				}
			);
			console.log("Tarefa modificada com sucesso.");
		})
		.catch((error) =>
		{
			console.error("Erro: ", error);
		})
	};
    function Add(Tarefa)
    {
		const database = getDatabase(firebase);
		var Id = Date.now().toString();
		const TarefaRef = ref(database, 'tarefas/' + Id);
		set(TarefaRef, {Tarefa: {...Tarefa, Data: Tarefa.Data.toString()}, Completado: false})
		.then(() =>{
			SetTarefas((Tarefas) =>
				[...Tarefas, {Id: Id, Tarefa: Tarefa, Completado: false}]
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
				<Stack.Screen
					options={{headerShown: false}}
					name="Login"
					component={TelaLogin}
				/>
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
			padding: 50,
			backgroundColor: '#2020ff',
			alignItems: 'center',
		},
		HeaderText: {
			paddingTop: 20,
			color: '#fff',
      		fontSize: 24,
      		fontWeight: 'bold',
    	},
	}
);
