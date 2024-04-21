import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, View, StyleSheet } from 'react-native';
import ToDoItem from "./ToDoItem.js"

export default function ToDoList({Itens, TrocaEstado, Deleta})
{
    const Nav = useNavigation();
    function NavAddTarefa()
    {
        Nav.navigate("AddTarefa");
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={Itens}
                renderItem={({item}) => (
                    <ToDoItem
                        Item={item}
                        TrocaEstado={TrocaEstado}
                        Deleta={Deleta}
                    />
                )}
                keyExtractor={Item => Item.Id}
            />
            <Button title='Add Tarefa' onPress={NavAddTarefa}/>
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
			padding: 50,
			backgroundColor: '#2020ff',
			alignItems: 'center',
		},
		HeaderText: {
			paddingTop: 50,
			color: '#fff',
      		fontSize: 24,
      		fontWeight: 'bold',
    	},
	}
);
