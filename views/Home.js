import * as React from 'react';
import { Modal, Pressable, StyleSheet, View, Text, Button,
TextInput, Alert, TouchableOpacity,TouchableHighlight, ScrollView } from 'react-native'
import { useEffect, useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { LinearGradient } from 'expo-linear-gradient';

const Home= ({goals, setGoals, categories, setCategories }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [goalInput, setGoalInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Other');

  useEffect(() => {
    console.log("Home useEffect")
    _storeData()
  }, [goals])

  const _storeData = async () => {
    try {
      // we need to stringify our array into a string
      if(goals !== null){
        console.log("storing goals = " + goals)
        await AsyncStorage.setItem('goals', JSON.stringify(goals) );
      }
    } catch (error) {
      // Error saving data
    }
  };

  const createGoal = () => {
    console.log('Lets do it pressed!')

    let newGoal = {
      key: uuid.v4(), 
      body: goalInput,
      price: priceInput,
      category: selectedCategory
    }
    let newList = [...goals];
    console.log("goals... newList= " + newList)
    newList.push(newGoal);
    setGoals(newList);
  }

  const closeRow = (rowMap, rowKey, data) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
    const newData = [...categories];
    const prevIndex = newData.findIndex(item => item.category === data.item.category);
    const dateData = new Date(); console.log("new Date= " + dateData)
    const localeDate = dateData.toLocaleDateString(); console.log("localeDate = " + localeDate)

    data.item.date = localeDate;
    // console.log("data = "+ data)
    // console.log("prevIndex= " + prevIndex);
    // console.log("newData[prevIndex].list = " + newData[prevIndex].list)
    newData[prevIndex].list.push(data.item)
    // console.log("newData.list");
    console.log(newData[prevIndex].list);
    setCategories(newData);
    deleteRow(rowMap, rowKey);
  };

  const deleteRow = (rowMap, rowKey) => {
      //closeRow(rowMap, rowKey);
      const newData = [...goals];
      const prevIndex = goals.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setGoals(newData);
  };

  const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
  };

  const renderHiddenItem = (data, rowMap) => (
      <View style={styles.rowBack}>
          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => closeRow(rowMap, data.item.key, data)}
          >
              <Text style={styles.backTextWhite}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => deleteRow(rowMap, data.item.key)}
          >
              <Text style={styles.backTextWhite}>Delete</Text>
          </TouchableOpacity>
      </View>
  );

  const renderItem = (data) => {
    return(
      <TouchableHighlight
          onPress={() => console.log('Row touched')}
          style={styles.rowFront}
          underlayColor={'#AAA'}
      >
        <View style={styles.row}>
        
          <Text style={styles.itemBody}>{data.item.body} </Text>
          <Text style={{color: "orange", fontWeight: "bold", width: "20%"}}>{data.item.price} € </Text>
          <Text style={{color: "orange", fontStyle: "italic", width: "30%"}}>{data.item.category}</Text>
        
        </View>
      </TouchableHighlight>
    )
  };

  const renderPickerItems = () => (
      categories.map((data, idx) => {
        return(
          <Picker.Item label={data.category} value={data.category} key={idx}/>
        )
      })
    
  )

  return(
  <View style={styles.centeredView}>

     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.transparentView}>
          <ScrollView>
            <View style={styles.modalView}>
              
              <View style={styles.exitButtonRow}>
                <Pressable 
                  style={styles.exitButton}
                  onPress={() => {setModalVisible(!modalVisible)}}
                  ><Text style={styles.exitStyle}>X</Text></Pressable>
              </View>

              <Text style={styles.modalTextStyle}>Goal</Text>
              

              <TextInput 
              value={goalInput}
              onChangeText={(text) => setGoalInput(text)} 
              style={styles.input}/>
              
              <View style={styles.pickerRow}>
                <View style={styles.priceContainer}>
                  <Text style={[styles.modalTextStyle,{marginLeft: 0, paddingLeft: 0, paddingRight: 4}]}>Price</Text>
                  <TextInput 
                  style={styles.priceInput}
                  value={priceInput}
                  onChangeText={(text) => setPriceInput(text)} 
                  />
                </View>

      
              
                <View style={styles.picker}>
                    <Text style={[styles.modalTextStyle, {marginBottom: 6}]}>Category </Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        itemStyle={styles.itemStyle}
                        selectedValue={selectedCategory}
                        onValueChange={ (itemValue, itemIndex) => setSelectedCategory(itemValue) }>
                        {categories && renderPickerItems()}
                      </Picker>
                    </View>
                </View>
                
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose, {marginTop: 8, marginBottom: 0}]}
                onPress={() => {setModalVisible(!modalVisible), createGoal()}}>
                <Text style={styles.textStyle}>Let's do it!</Text>
              </Pressable>
          
            </View>
           </ScrollView>
        </View>
      </Modal>

      <SwipeListView
                data={goals}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
      {/* <View style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 8,
        borderTopWidth: .5
      }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Create</Text>
        </Pressable>
      </View> */}
      

       <View style={styles.Pressable}>
          <Pressable
            style={styles.PressableButton}
            onPress={() => setModalVisible(true)}>
             <Text style={styles.textStyle}>+</Text>
          </Pressable>
        </View>

  </View>

  )

}

const styles = StyleSheet.create({

  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 0,
  },

  itemBody: {
    fontSize: 14,
    color: 'orange',
    width: "50%"
  },


  //modal start

  centeredView: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#212121',
  },
  transparentView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    marginTop: 71,
    backgroundColor: '#555555',
    borderRadius: 20,
    padding: 25,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
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
  input: {
    height: 50, 
    borderColor: 'orange', 
    width:300,
    borderWidth: 1,
    justifyContent: 'center',
    margin: "5%",
    color: 'white',
  },
  priceInput:{
    height: 50, 
    borderColor: 'orange', 
    width:90,
    borderWidth: 1,
    justifyContent: 'center',
    margin: "5%",
    color: 'white',
    marginLeft: 0,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 0,
    paddingLeft: 3,
    marginRight: 9
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },  
  exitStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'gray',
    width: "50%",
  },
  buttonClose: {
    backgroundColor: 'green',
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: "black",
    fontSize: 22,
    fontWeight: 'bold',
  },
  exitButtonRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 0,
  },
  exitButton: {
    padding: 10,
    backgroundColor: "orange",
    borderTopEndRadius: 10,
  },



  //modal end

  // SwipeListView start

  backTextWhite: {
      color: 'black',
  },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#2a2a2a',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 70,
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      height: 70,
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
      backgroundColor: 'orange',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },

  // SwipeListView end


  //picker start
  picker: {
    paddingTop: "0%",
    marginTop: "0%",
    paddingBottom: 0,
    marginBottom: "3%",
    marginLeft: "0%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  },

  pickerContainer: {
    borderColor: 'orange',
    borderWidth: 1,
  },

  itemStyle: {
    color:'white',
    width:200, 
    height:250,
    fontSize: 14,
    marginTop: "0%",
  },

  pickerRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  //picker end

  //pressable start

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

  //pressable end

});


export default Home;
