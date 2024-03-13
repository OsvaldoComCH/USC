import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, View } from 'react-native';
import ToDoItem from "./ToDoItem.js"

export default function ToDoList({Itens, TrocaEstado, Deleta})
{
    const Nav = useNavigation();
    function NavAddTarefa()
    {
        Nav.navigate("AddTarefa");
    };
    return (
        <View>
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