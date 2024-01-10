import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import { useEffect } from 'react';
//import { LinearGradient } from 'expo-linear-gradient';

const Home= () => {

  useEffect(() => {
    console.log("Home useEffect")
  }, [])


//   const renderList = () => (
//     list.map((data,idx) =>{
     
//       return(
//       <View key={idx}>
//       </View>
//       )
  
//     })
//   )

return(
<View style={styles.container}>
<View style={styles.inputContainer}>
    <Text style={{color: "orange"}}>Add</Text>
    <TextInput style={styles.input}></TextInput>
</View>
</View>

)

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


export default Home;
