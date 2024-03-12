import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import React from 'react';

function ToDoItem({Item, TrocaEstado, Deleta})
{
    return (
        <View style={styles.ToDoItem}>
            <Switch
                value={Item.Completado}
                onValueChange={() => TrocaEstado(Item.Id)}
            />
            <Text style={Item.Completado ? styles.CompletedText : styles.Text}>
                {Item.Text}
            </Text>
            <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        ToDoItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#C0C0C0",
        },
        Text: {
            fontSize: 18,
        },
        CompletedText: {
            fontSize: 18,
            textDecorationLine: "line-through",
            color: "#c0c0c0",
        },
        DeleteButton: {
            color: "#ff0000",
            fontSize: 18,
        },
    }
);