import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import { useEffect } from 'react';

const Budget = ({categories}) => {

    useEffect(() => {
        console.log("Budget.js useEffect")
    },[])

    const renderCategories = () => (
        categories.map((data,idx) =>{
         
          return(
          <View key={idx}>
            <Text>{data}</Text>
          </View>
          )
      
        })
      )

    return (
        <View style={styles.container}>
            {renderCategories()}
            <View style={styles.inputContainer}>
                <Text style={{color: "orange"}}>Add</Text>
                <TextInput style={styles.input}></TextInput>
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
      margin: "5%"
    }
  });
  

export default Budget;