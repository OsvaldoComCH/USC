import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoList from './Components/ToDoList';
import TelaAddTarefa from "./Telas/AddTarefa";
const Stack = createStackNavigator();
export default function App() {
	const [Tarefas, SetTarefas] = useState([
		{Id: 1, Text: "Bom Dia", Completado: false},
		{Id: 2, Text: "Bom Tarde", Completado: false},
		{Id: 3, Text: "Bom Noite", Completado: false}
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
    function Add(Text)
    {
        SetTarefas(
            [...Tarefas, {id: Date.now(), Text: Text, Completado: false},]
        )
    }
	return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown: false}}>
                    {() =>{
                        <View style={styles.container}>
                            <View style={styles.Header}>
                                <Text style={styles.HeaderText}>Lista de Tarefas</Text>
                            </View>
                            <ToDoList Itens={Tarefas} TrocaEstado={TrocaEstado} Deleta={Deleta}/>
                        </View>
                    }}
                </Stack.Screen>
                <Stack.Screen
                    options={{headerShown: false}}
                    name="AddTarefa"
                    component={TelaAddTarefa}
                    initialParams={{AddTarefa: Add}}
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
