import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function App() {
	return (
		<View style={styles.container}>
		<View style={styles.Header}>
			<Text style={styles.HeaderText}>Lista de Tarefas</Text>
		</View>

		</View>
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
