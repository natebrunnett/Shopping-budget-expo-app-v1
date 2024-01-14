import * as React from 'react';
import { Modal, Pressable, StyleSheet, View, Text, Button,
TextInput, Alert, TouchableOpacity,TouchableHighlight } from 'react-native'
import { useEffect, useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
//import { LinearGradient } from 'expo-linear-gradient';

const Home= ({goals, setGoals}) => {

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("Home useEffect")
  }, [])

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
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
          <Text>Left</Text>
          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => closeRow(rowMap, data.item.key)}
          >
              <Text style={styles.backTextWhite}>Close</Text>
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
          onPress={() => console.log('You touched me')}
          style={styles.rowFront}
          underlayColor={'#AAA'}
      >
        <View style={styles.row}>
        
          <Text style={{color: "orange"}}>{data.item.body} </Text>
        
          <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <Text style={{color: 'white'}}>{data.item.key}</Text>
            <Text style={{color: "orange", fontWeight: "bold"}}>{data.item.price} € </Text>
            <Text style={{color: "orange", fontStyle: "italic"}}>{data.item.category}</Text>
          </View>
        
        </View>
      </TouchableHighlight>
    )
  };

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
          
          <View style={styles.modalView}>
            
            <Text style={styles.modalText}>Goal</Text>
            
            <TextInput style={styles.goalInput}/>
            
            <View style={{display: 'flex', flexDirection: 'row', alignItems: "center", gap: 5}}>
              <Text style={{fontWeight: 'bold', fontSize: 14, paddingBottom: 10}}>Price</Text>
              <TextInput style={styles.priceInput}></TextInput>
            </View>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Let's do it!</Text>
             </Pressable>
         
           </View>
        
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
      <View style={{
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
      </View>


  </View>

  )

}

const styles = StyleSheet.create({

  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },


  //modal start

  centeredView: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#212121',
  },
  transparentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    width: "80%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    color: "black",
    fontSize: 22,
    fontWeight: 'bold'
  },

  goalInput: {
    width: "85%",
    height: 35,
    margin: 0,
    marginBottom: 10,
    padding: 0,
    borderWidth: 1,
    borderRadius: 8,
  },

  priceInput: {
    width: "20%",
    height: 35,
    margin: 0,
    marginBottom: 10,
    padding: 0,
    borderWidth: 1,
    borderRadius: 8,
  },

  //modal end

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


export default Home;
