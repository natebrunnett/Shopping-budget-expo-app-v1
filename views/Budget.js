import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, Modal, FlatList, TouchableHighlight, TouchableOpacity} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
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

  const [createMode, setCreateMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [currentKey, setKey] = useState(null);

  const [showModalError, setError] = useState(undefined);

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
        list: [],
      }
      newList.push(newObject)
      setCategories(newList);
      setCatInput('');
      setWeeklyInput('');
      setMonthlyInput('');
      console.log(categories);
      

    }
    
    const updateCategory = (thisKey) => {
      const idx = categories.findIndex((element) => element.key === thisKey) 

      const newCategory = {
        key: thisKey, 
        category: catInput,
        weeklyBudget: weeklyInput,
        monthlyBudget: monthlyInput,
        list: categories[idx].list,
      }
      
      categories.splice(idx, 1, newCategory);
      setCatInput('');
      setWeeklyInput('');
      setMonthlyInput('');
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


    // function Item({ item }) {
    //     return (
    //         <View style={styles.listRow}>
    //           <Text style={styles.listItem}>{item.body} {item.price} {item.date}</Text>
    //         </View>
    //     );
    // }

    const renderTotal = (list) => {
      let total = 0;
      const numberArray = list.map((x) => x.price);
      for (let i = 0; i < numberArray.length; i++){
        total += parseInt(numberArray[i])
      }
      return total
    }

    const closeRow = (rowMap, rowKey, data) => {
      console.log("row closed")
    };
  
    const deleteRow = (rowMap, rowKey) => {
        // const newData = [...goals];
        // const prevIndex = goals.findIndex(item => item.key === rowKey);
        // newData.splice(prevIndex, 1);
        // setGoals(newData);
        console.log("row deleted")
    };

    const renderHiddenItem = (data, rowMap) => (
      <View style={styles.rowBack}>
          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => {
                closeRow(rowMap, data.item.key, data), 
                setUpdateMode(true), 
                setKey(data.item.key.toString()),
                setModalVisible(true),
                setCatInput(data.item.category),
                setWeeklyInput(data.item.weeklyBudget.toString()),
                setMonthlyInput(data.item.monthlyBudget.toString())}}
          >
              <Text style={styles.backTextWhite}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => deleteCategory(data.item.key)}
          >
              <Text style={styles.backTextWhite}>Delete</Text>
          </TouchableOpacity>
          
      </View>
  );


    const renderCategories = (data) => {
         
      return(
      <TouchableHighlight
        onPress={() => console.log('Row touched')} 
        style={styles.catContainer}
        underlayColor={'#AAA'}
      >
        <View style={{backgroundColor: '#212121'}}>

          <View style={styles.catHeaderContainer}>
          
            <View style={styles.catInfoContainer}>
              <Text style={styles.catTitle}>Category</Text>
              <Text style={styles.catContainerText}>{data.item.category}</Text>
            </View>

            <View style={styles.catInfoContainer}>
              <Text style={styles.catTitle}>Weekly</Text>
              <Text style={styles.catContainerText}>{data.item.weeklyBudget}</Text>
            </View>

            <View style={styles.catInfoContainer}>
              <Text style={styles.catTitle}>Monthly</Text>
              <Text style={styles.catContainerText}>{data.item.monthlyBudget}</Text>
            </View>

          </View>

          <View style={styles.historyTitle}>
            <Text style={{color:"orange"}}>History</Text>
          </View>

          {data.item.list && data.item.list.map((listData, idx) => {
            return(
            <View style={styles.historyContainer} key={idx}>
              <View>
                <Text style={styles.listItemBody}>{listData.body}</Text>
              </View>
              <View>
                <Text style={styles.listItemPrice}>{listData.price}</Text>
              </View>
              <View>
                <Text style={styles.listItemDate}>{listData.date}</Text>
              </View>
            </View>)
          })}
          

          <View style={styles.totalHeader}>
            <Text style={{color: 'orange', marginBottom: 0, paddingBottom: 0}}>Total</Text>
            <Text style={styles.listItem}>{renderTotal(data.item.list)}€</Text>
          </View>
        </View>

      </TouchableHighlight>
      )
    }


    return (
        <View style={styles.container}>
            
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
                      
                      {/* //extend a bar on top to increase width of modal */}
                      <View style={styles.exitButtonRow}>
                        <Pressable
                          style={styles.exitButton}
                          onPress={() => {
                            setModalVisible(!modalVisible),
                            setCreateMode(false),
                            setUpdateMode(false),
                            setKey(null),
                            setCatInput(''),
                            setWeeklyInput(''),
                            setMonthlyInput('')
                            }}>
                          <Text style={styles.textStyle}>X</Text>
                        </Pressable>
                      </View>
                      
                      <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Category</Text>
                        <TextInput 
                          value={catInput} 
                          style={styles.input}
                          onChangeText={(text) => setCatInput(text)}
                          ></TextInput>
                      </View>

                      <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Weekly</Text>
                        <TextInput 
                          value={weeklyInput} 
                          style={styles.input}
                          onChangeText={(text) => setWeeklyInput(text)}
                          ></TextInput>
                      </View>

                      <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Monthly</Text>
                        <TextInput 
                          value={monthlyInput} 
                          style={styles.input}
                          onChangeText={(text) => setMonthlyInput(text)}
                          ></TextInput>
                      </View>

                      {createMode &&
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            setModalVisible(!modalVisible), 
                            addCategory(),
                            setCreateMode(false)}}>
                          <Text style={styles.textStyle}>Create</Text>
                        </Pressable>
                      }

                      {updateMode &&
                        <> 
                        <Text style={{color: 'white'}}>Key {currentKey}</Text>

                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            setModalVisible(!modalVisible), 
                            updateCategory(currentKey),
                            setUpdateMode(false),
                            setKey(null)}}>
                          <Text style={styles.textStyle}>Update</Text>
                        </Pressable>
                        </>
                      }
                    
                    </View>
                  </ScrollView>
                </View>
              </Modal>
            {/* <ScrollView>
            {renderCategories()}
            </ScrollView> */}
            <SwipeListView
                data={categories}
                renderItem={renderCategories}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
            <View style={styles.Pressable}>
              <Pressable
                style={styles.PressableButton}
                onPress={() => {setModalVisible(true), setCreateMode(true)}}>
                <Text style={styles.textStyle}>+</Text>
              </Pressable>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: '#212121',
    },
    Pressable: {
      position: 'absolute',
      bottom: 5,
      right: 5
    },
    PressableButton: {
      border: 'black',
      borderWidth: 2,
      borderRadius: 35,
      paddingTop: 32,
      paddingBottom: 32,
      paddingLeft: 37,
      paddingRight: 37,
      backgroundColor: 'gray'
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

    historyTitle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
    },

    historyContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    totalHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
    },

    listRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: "100%"
    },

    listItem: {
      color: 'white',
    },

    listItemBody: {
      color: 'white',
      width: 250,
    },
    listItemPrice: {
      color: 'white',
      width: 40,
    },
    listItemDate: {
      color: 'white',
      width: 90,

    },

    catHeaderContainer: {
      width: "100%",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 10,
      marginTop: 5,
    },

    catInfoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      width: 100,
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
      backgroundColor: 'black',
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
    modalContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'white',
      width: "100%",
      fontSize: 22,
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
    exitButton: {
      padding: 5,
      backgroundColor: "orange",
      borderTopEndRadius: 10,
    },
    exitButtonRow: {
      width: 360,
      padding: 0,
      margin: 0,
      left: 25,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      borderRadius: 10,
    },
    FlatList: {
      backgroundColor: "red",
      border: "white"
    },

    // SwipeListView start

  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#2a2a2a',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },

// SwipeListView end

  });
  

export default Budget;