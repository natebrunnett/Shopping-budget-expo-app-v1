import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react';

/* We are storing
{
  category: "Groceries",
  weeklyBudget: 60,
  monthlyBudget: 240,
} */

const Budget = ({categories, setCategories}) => {

  const [catInput, setCatInput] = useState('');

    useEffect(() => {
        console.log("Budget.js useEffect")
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
        if(goals.length !== 0 && goals !== null){
          console.log("storing categories= " + categories)
          await AsyncStorage.setItem('categories', JSON.stringify(categories) );
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
                onPress={() => addCategory()}>
                <Text style={styles.textStyle}>Let's do it!</Text>
              </Pressable>
            </View>
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
    }
  });
  

export default Budget;