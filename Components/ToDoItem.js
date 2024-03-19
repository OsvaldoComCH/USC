import { Animated, StyleSheet, Text, View, TouchableOpacity, Switch, Platform, UIManager, LayoutAnimation } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

if(Platform.OS === 'android')
{
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ToDoItem({Item, TrocaEstado, Deleta})
{
    const [IsExpanded, SetIsExpanded] = useState(false);
    const AnimationValue = useRef(new Animated.Value(0)).current

    function Expand()
    {
        LayoutAnimation.spring();
        SetIsExpanded(!IsExpanded);
    }

    useEffect(() => {
        Animated.timing(AnimationValue, {
            toValue: Item.Completado ? 0.25 : 1,
            duration: 1000,
            useNativeDriver: true,
        }).start
    }, [Item.Completado]);

    return (
        <Animated.View style={[styles.container, {opacity: AnimationValue}]}>
            <View style={styles.ToDoItem}>
                <Switch
                    value={Item.Completado}
                    onValueChange={() => TrocaEstado(Item.Id)}
                />
                <TouchableOpacity onPress={Expand}>
                    <Text style={Item.Completado ? styles.CompletedText : styles.Text}>
                        {Item.Tarefa.Nome}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Deleta(Item.Id)}>
                    <Text style={styles.DeleteButton}>Excluir</Text>
                </TouchableOpacity>
            </View>
            {IsExpanded && (
                <View>
                    <Text style={styles.Text}><Text style={{fontWeight: 'bold'}}>Data: </Text>{Item.Tarefa.Data.toLocaleString().split(" ")[0]}</Text>
                    <Text style={styles.Text}><Text style={{fontWeight: 'bold'}}>Descrição: </Text>{Item.Tarefa.Descricao}</Text>
                </View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create(
    {
        container:{
            flexDirection: 'column',
            backgroundColor: "#e0e0e0",
            borderBottomWidth: 1,
            borderBottomColor: "#c0c0c0"
        },
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