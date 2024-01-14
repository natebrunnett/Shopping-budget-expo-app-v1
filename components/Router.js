
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import Budget from '../views/Budget';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Router() {

  const Stack = createBottomTabNavigator();

  /* Adding, removing and updating goals is going to require
  a unique a ID.  Since there is no built in add function
  this means that the add function that is coded by myself
  will need to have a uuid generated for each item key
  
  Since variables are stored in AsyncStorage, the id state
  can be stored and then retrieved.  This means the id state
  can just be incremented by one, it doesn't need to be uuid.
  
  */
  const [goals, setGoals] = useState(Array(20)
    .fill('')
    .map((_, i) => ({ 
      key: `${i}`, 
      body: "1/3 kg of chicken",
      price: 5,
      category: "grocery"
     })));
  const [categories, setCategories] = useState([6,7,8,9,10]);

  /*goal[0]= {
    body: "1/3 Kg of chicken"
    price: 5 (euros),
    category: "grocery"
  } 
  
  categories[0]={
    category: "grocery"
    notes: "best place to go is El Jamon up the street
      prices are cheap, and they have most items"
    weeklyGoal: "50 (euros)",
    monthlyGoal: "200 (euros)"
  }
  
  */

  useEffect(() => {
    //_retrieveData from AsyncStorage
    console.log("Router useEffect")
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerTitleStyle: {color: "orange"},
            headerStyle: { 
                backgroundColor: "#2a2a2a",
                shadowColor: 'black'
                },
            tabBarStyle: { 
                backgroundColor: "#2a2a2a", 
                borderTopColor: "black",
                borderTopWidth: .7},
            tabBarLabelStyle: {color: "orange"},
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <Entypo name="list" size={25} color="orange" />
              ) : (
                <Entypo name="list" size={20} color="orange" />
              )
          }}
        >
        {props => <Home {...props}
        goals={goals}
        setGoals={setGoals} 
        />}
        </Stack.Screen>
        <Stack.Screen
          name="Budget"
          options={{
            headerTitleStyle: {color: "orange"},
            headerStyle: { 
                backgroundColor: "#2a2a2a",
                shadowColor: 'black'
                },
            tabBarStyle: { 
                backgroundColor: "#2a2a2a", 
                borderTopColor: "black",
                borderTopWidth: .7},
            tabBarLabelStyle: {color: "orange"},
            tabBarLabel: 'Budget',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <AntDesign name="barschart" size={25} color="orange" />
              ) : (
                <AntDesign name="barschart" size={20} color="orange" />
              )
          }}
        >
        {props => <Budget {...props} 
        categories={categories}
        />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
