import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";

export default function TelaCamera({navigation, route})
{
    const [HasPermission, SetHasPermission] = useState(null);
    const [camera, SetCamera] = useState(null);
    const [Image, SetImage] = useState(null);
    const [Type, SetType] = useState(Camera.Constants.Type.back);

    useEffect(() =>
    {
        (async () =>
            {
                const {status} = await Camera.requestCameraPermissionsAsync();
                SetHasPermission(status === 'granted');
            }
        )();
    }, [route.params]);
    const TakePicture = async () =>
    {
        if(camera)
        {
            const data = await camera.takePictureAsync(null)
            SetImage(data);
        }
    }
    return
    (
        <View style={styles.container}>
            {HasPermission ? (
                <View style={styles.CameraContainer}>
                {Image ? (
                    <View style={styles.container}>
                        <Image source={{uri: Image.uri}} style={styles.image}/>
                        <Button
                            color='grey'
                            title="Tirar nova foto"
                            onPress={() => {SetImage(null)}}
                        />
                        <Button
                            color='grey'
                            title="Usar esta foto"
                            onPress={() => {navigation.navigate('addPost', {uid: route.params.uid, image: Image.uri})}}
                        />
                    </View>
                ) : (
                    <Camera
                        ref={(ref) => SetCamera(ref)}
                        style={styles.camera}
                        type={Type}
                        ratio="1:1"
                    />
                )}
                </View>
            ) : (
                <Text>Permissão da câmera negada</Text>
            )}
            {!Image && (
                <View>
                    <Button
                        color='grey'
                        title="Trocar Câmera"
                        onPress={() => {
                            SetType(
                                Type === Camera.Constants.Type.back ?
                                Camera.Constants.Type.front :
                                Camera.Constants.Type.back
                            );
                        }}
                    />
                    <Button
                        title="Tirar Foto"
                        onPress={() => TakePicture()}
                    />
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
	},
	CameraContainer: {
		flex: 1,
        flexDirection: 'row'
	},
	image: {
        flex: 1,
        resizeMode: "contain"
	},
	camera: {
		flex: 1,
        aspectRatio: 1
	}
});