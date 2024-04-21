import React, {useState} from 'react';
import { View, Button, TextInput, StyleSheet, Platform, Text } from 'react-native';
import Datetimepicker from '@react-native-community/datetimepicker'

export default function TelaAddTarefa({navigation, route})
{
    const [Tarefa, SetTarefa] = useState({Nome: "", Descricao: "", Data: new Date(Date.now())});
    const [ShowDatePicker, SetShowDatePicker] = useState(false);
    
    function Add()
    {
        route.params.AddTarefa(Tarefa);
        SetTarefa({Nome: "", Descricao: "", Data: new Date(Date.now())});
        navigation.goBack();
    }

    function SaveDate(event, value)
    {
        SetTarefa({...Tarefa, Data: value});
        if(Platform.OS === "android")
        {
            SetShowDatePicker(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
				<Text style={styles.HeaderText}>Lista de Tarefas</Text>
			</View>
            <TextInput
                style={styles.Input}
                placeholder="Nome da Tarefa"
                value={Tarefa.Nome}
                onChangeText={(value) => SetTarefa({...Tarefa, Nome: value})}
            />
            <TextInput
                style={styles.Input}
                placeholder="Descrição"
                multiline={true}
                value={Tarefa.Descricao}
                onChangeText={(value) => SetTarefa({...Tarefa, Descricao: value})}
            />
            {!ShowDatePicker && (
                <View style={styles.DateButton}>
                    <Button title={Tarefa.Data.toLocaleString().split(' ')[0]}
                    onPress={()=> SetShowDatePicker(true)}
                    />
                </View>
            )}
            {ShowDatePicker && (
                <Datetimepicker
                    value={Tarefa.Data}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={SaveDate}
                    style={styles.DatePicker}
                />
            )}
            <Button title="Salvar" onPress={Add}/>
        </View>
    );
};
const styles = StyleSheet.create(
	{
        Input: {
            height: 40,
            borderColor: "#c0c0c0",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10
        },
		container: {
			flex: 1,
			backgroundColor: '#fff',
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
        DateButton: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
        },
        DatePicker: {
            width: 320,
            height: 260,
            display:'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
        },
	}
);