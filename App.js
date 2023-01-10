import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Modal, StyleSheet, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ColorPicker } from './color/src/index.ts'
export default function ImagePickerExample() {
  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const addColor = async (col) => {
    setColor(col);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          flexDirection: 'column',
        }}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {image &&
            <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 10, marginHorizontal: 10 }} />
          }
          {color &&
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              backgroundColor: color,
            }} />
          }
        </View>
        {!image && <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            backgroundColor: '#8080803f',
            justifyContent: 'center',
            alignItems: 'center'

          }}>
          <Button title="+" onPress={pickImage} />
        </View>}

        {!color && <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Add Color</Text>
        </Pressable>}
      </View>
      <View
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ColorPicker
                pickerWidth={200}
                pickerHeight={200}
                onColorSelected={color => {
                  console.log(color);
                  addColor(color);
                  setModalVisible(!modalVisible);
                }}
                hideSliders={true}
                hideControls={true}
              />
            </View>
          </View>
        </Modal>
      </View>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
      >
        <Text style={styles.textStyle}>Add Variation</Text>
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 300,
    padding: 35,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 250,
    height: 250
  },
  button: {
    borderRadius: 20,
    width: 100,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
    color: 'white'
  }
});

productPost = {
  images: [],
  colors: [],
  itemSizes: [],
  shortDescription: "",
}