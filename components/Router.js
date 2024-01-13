
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Router() {

  const Stack = createBottomTabNavigator();

  useEffect(() => {
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
                },
            tabBarStyle: { 
                backgroundColor: "#2a2a2a", 
                borderTopColor: "black",
                borderTopWidth: .7},
            tabBarLabelStyle: {color: "orange"},
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <MaterialCommunityIcons name="weather-sunny" size={25} color="orange" />
              ) : (
                <MaterialCommunityIcons name="weather-sunny" size={20} />
              )
          }}
        >
        {props => <Home {...props} 
        />}
        </Stack.Screen>
        <Stack.Screen
          name="Budget"
          options={{
            headerTitleStyle: {color: "orange"},
            headerStyle: { 
                backgroundColor: "#2a2a2a",
                },
            tabBarStyle: { 
                backgroundColor: "#2a2a2a", 
                borderTopColor: "black",
                borderTopWidth: .7},
            tabBarLabelStyle: {color: "orange"},
            tabBarLabel: 'Budget',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <MaterialCommunityIcons name="weather-sunny" size={25} color="orange" />
              ) : (
                <MaterialCommunityIcons name="weather-sunny" size={20} />
              )
          }}
        >
        {props => <Budget {...props} 
        />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
