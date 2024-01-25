import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, Modal } from 'react-native'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

/* We are storing
{
  category: "Groceries",
  weeklyBudget: 60,
  monthlyBudget: 240,
} */

const Budget = ({categories, setCategories}) => {

  const [catInput, setCatInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [weeklyInput, setWeeklyInput] = useState('');
  const [monthlyInput, setMonthlyInput] = useState('');

    useEffect(() => {
        console.log("Budget.js useEffect")
        _storeData()
    },[categories])

    const addCategory = () => {

      const newList = [...categories];
      const newObject= {
        key: uuid.v4(), 
        category: catInput,
        weeklyBudget: weeklyInput,
        monthlyBudget: monthlyInput,
        list: []
      }
      newList.push(newObject)
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

    const deleteCategory = (uuid) => {
      const newList= [...categories];
      const prevIndex = categories.findIndex(item => item.key === uuid);
      newList.splice(prevIndex, 1);
      setCategories(newList);
    }


    const renderCategoriesList = (list) => (
      list.map((data, idx) => {
        console.log("categoryList Data");
        console.log(data);
        return (
          <View key={idx}>
          <Text>{data.item.body} {data.item.price} {data.date}</Text>
          </View>
        )
      })
    )
  

    const renderCategories = () => (

      categories.map((data,idx) =>{
         
          return(
          <View style={styles.catContainer} key={idx}>
            <View style={styles.deleteButtonRow}>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteCategory(data.key)}>
                  <Text>Delete</Text>
              </Pressable>
            </View>
            <Text style={styles.catTitle}>Category</Text>
            <Text style={styles.catContainerText}>{data.category}</Text>
            <Text style={styles.catTitle}>Weekly budget</Text>
            <Text style={styles.catContainerText}>{data.weeklyBudget}</Text>
            <Text style={styles.catTitle}>Monthly budget</Text>
            <Text style={styles.catContainerText}>{data.monthlyBudget}</Text>
            <ScrollView>
              {data.list && renderCategoriesList(data.list)}
            </ScrollView>
            {/* <Text style={styles.catContainerText}>{data.key}</Text> */}
          </View>
          )
      
        })
      
      
    )


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={{color: "orange"}}>Add Category</Text>
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
                  <ScrollView>
                    <View style={styles.modalView}>
                      <View style={styles.exitButtonRow}>
                        <Pressable
                          style={styles.exitButton}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>X</Text>
                        </Pressable>
                      </View>
                      <Text style={styles.modalText}>Category</Text>
                      <TextInput 
                        value={catInput} 
                        style={styles.input}
                        onChangeText={(text) => setCatInput(text)}
                        ></TextInput>
                      <Text style={styles.modalText}>WeeklyBudget</Text>
                      <TextInput 
                        value={weeklyInput} 
                        style={styles.input}
                        onChangeText={(text) => setWeeklyInput(text)}
                        ></TextInput>
                      <Text style={styles.modalText}>MonthlyBudget</Text>
                      <TextInput 
                        value={monthlyInput} 
                        style={styles.input}
                        onChangeText={(text) => setMonthlyInput(text)}
                        ></TextInput>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible), addCategory()}}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                      </Pressable>
                    </View>
                  </ScrollView>
                </View>
              </Modal>
            <ScrollView>
            {renderCategories()}
            </ScrollView>
            
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
      color: 'black',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    catContainer: {
      width: "100%",
    },
    catContainerText: {
      color: 'white'
    },
    catTitle: {
      color: 'orange'
    },
    deleteButtonRow: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 10
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      marginTop: 70,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      paddingTop: 0,
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
    exitButton: {
      padding: 5,
      backgroundColor: "orange",
      borderTopEndRadius: 10,
    },
    exitButtonRow: {
      width: 200,
      padding: 0,
      margin: 0,
      left: 25,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      borderRadius: 10,
    },
  });
  

export default Budget;