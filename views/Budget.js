import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, Modal } from 'react-native'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* We are storing
{
  category: "Groceries",
  weeklyBudget: 60,
  monthlyBudget: 240,
} */

const Budget = ({categories, setCategories}) => {

  const [catInput, setCatInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log("Budget.js useEffect")
        _storeData()
    },[categories])

    const addCategory = () => {

      const newList = [...categories];
      newList.push(catInput);
      setCategories(newList);
      setCatInput('');
      console.log(categories);
      

    }

    const _storeData = async () => {
      try {
        // we need to stringify our array into a string
        if(categories !== null){
          console.log("storing categories= " + categories)
          await AsyncStorage.setItem('categories', JSON.stringify(categories) );
          console.log("category storage success")
        }
      } catch (error) {
        // Error saving data
      }
    };
  

    const renderCategories = () => (

      categories.map((data,idx) =>{
         
          return(
          <View style={styles.catContainer} key={idx}>
            <Text style={styles.catContainerText}>{data}</Text>
          </View>
          )
      
        })
      
      
    )


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={{color: "orange"}}>Add</Text>
              <TextInput 
                style={styles.input}
                value={catInput}
                onChangeText={(text) => setCatInput(text)}></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Let's do it!</Text>
              </Pressable>
              
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            {renderCategories()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: '#212121',
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    input: {
      height: 40, 
      borderColor: 'orange', 
      width:150,
      borderWidth: 1,
      justifyContent: 'center',
      margin: "5%",
      color: 'white',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    catContainer: {
      backgroundColor: 'green',
      width: "100%",
    },
    catContainerText: {
      color: 'white'
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: 'green',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  

export default Budget;