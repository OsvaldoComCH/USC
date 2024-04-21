import { Animated, StyleSheet, Text, View, TouchableOpacity, Switch, Platform, UIManager, LayoutAnimation } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { PanResponder } from 'react-native';

if(Platform.OS === 'android')
{
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ToDoItem({Item, TrocaEstado, Deleta})
{
    const Pan = useRef(new Animated.ValueXY()).current;

    const PResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {dx: Pan.x}], {useNativeDriver: false}),
        onPanResponderRelease: (_, gestureState) => {
            if(gestureState.dx <= -200)
            {
                Deleta(Item.Id);
            }else
            {
                Animated.spring(
                    Pan,
                    {toValue: {x: 0, y: 0}, useNativeDriver: true}
                ).start()
            }
        }
    })).current;

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
        }).start()
    }, [Item.Completado])
    ;

    return (
        <Animated.View {... PResponder.panHandlers}
            style={[{transform: [{translateX: Pan.x}]}, styles.container, {opacity: AnimationValue}]}>
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
            </View>
            {IsExpanded && (
                <View style={styles.TextContainer}>
                    <Text style={styles.Text}>
                        <Text style={{fontWeight: 'bold'}}>Data: </Text>
                        {Item.Tarefa.Data.toLocaleString().split(" ")[0]}
                    </Text>
                    <Text style={styles.Text}>
                        <Text style={{fontWeight: 'bold'}}>Descrição: </Text>
                        {Item.Tarefa.Descricao}
                    </Text>
                </View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create(
    {
        TextContainer:{
            flex: 1,
            alignItems: 'center'
        },
        container:{
            flexDirection: 'column',
            backgroundColor: "#eee",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc"
        },
        ToDoItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#Ccc",
        },
        Text: {
            fontSize: 18,
        },
        CompletedText: {
            fontSize: 18,
            textDecorationLine: "line-through",
            color: "#ccc",
        },
        DeleteButton: {
            color: "#f00",
            fontSize: 18,
        },
    }
);