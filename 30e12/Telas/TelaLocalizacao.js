import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../Componentes/Header";
import MapView, { Marker } from "react-native-maps"

export default function TelaLocalizacao({navigation, route})
{
    const Location = route.params.post.geolocalizacao;
    if(!Location)
    {
        console.log("Erro! Não possui localização");
        return(<View style={styles.container}>
            <Header showNav={true} navigation={navigation} route={route}/>
            <Text style={styles.fail}>Esse post não possui localização!</Text>
        </View>)
    }
    return(
        <View style={styles.container}>
            <View style={styles.Header}>
                <Header showNav={true} navigation={navigation} route={route}/>
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: Location.latitude,
                        longitude: Location.longitude,
                        latitudeDelta: 0.092,
                        longitudeDelta: 0.042,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: Location.latitude,
                            longitude: Location.longitude,
                        }}
                        title="Localização do Post"
                        description={route.params.post.legenda}
                    />
                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    Header: {
        flex: 0.3
    },
    map: {
        width: "100%",
        height: "100%",
    },
    fail: {
        color: "red",
        alignSelf: "center",
        fontSize: 20
    }
})