import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { Tab1Screen } from '../screens/Tab1Screen';
// import { Tab2Screen } from '../screens/Tab2Screen';

import { StackNavigator } from './StackNavigator';
import { colores } from '../theme/appTheme';
import { Platform, Text } from 'react-native';
import { TopTabNavigator } from './TopTabNavigator';


export const Tabs = () => {

  return Platform.OS === 'ios'
          ? <TabsIOS />
          : <TabsAndroid />
}



const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {
  return (
    <BottomTabAndroid.Navigator
      activeColor="#f0edf6"
      inactiveColor= "#694fab"
      barStyle={{ backgroundColor: '#694fab' }}
      shifting={true}
    >
      <BottomTabAndroid.Screen 
        name="Tab1Screen" 
        component={Tab1Screen}
        options={{
          tabBarLabel: 'Tab1',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name='home' color={color}  size={20}/>
          ),
        }}  
      />
      <BottomTabAndroid.Screen 
        name="TopTabNavigator" 
        component={TopTabNavigator}
        options={{
          title: 'Tab2',
          tabBarColor: '#694FAB',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name='home' color={color}  size={20}/>
          ),
        }}  
      />
      <BottomTabAndroid.Screen 
        name="StackNavigator" 
        component={StackNavigator}
        options={{
          title: 'Stack',
          tabBarColor: '#131313',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name='home' color={color}  size={20}/>
          ),
        }}  
      />
   
    </BottomTabAndroid.Navigator>
  );
}



const BottomTabIOS = createBottomTabNavigator();

const TabsIOS = () => {
  return (
    <BottomTabIOS.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={ ({ route }) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: colores.primary,
      
        tabBarStyle: {
          borderTopColor: colores.primary,
          borderTopWidth: 0,
          backgroundColor: colores.mate,
          elevation: 0,
          },
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIcon : ({color, focused, size})  => {

            let iconName: string = '';

            switch (route.name) {
              
              case 'Tab1Screen':
                iconName = 'T1'
                break;
              case 'Tab2Screen':
                iconName = 'T2'
                break;
              case 'StackNavigator':
                iconName = 'ST'
                break;
            
              default:
                break;
            }

            return <Text style={{color}}>{ iconName }</Text>
          },
      })}
    >
      {/* De esta forma se puede agregar un icono con tabBarIcon y pasarle algunas propiedades con una función.*/}
      {/* <BottomTabIOS.Screen name="Tab1Screen" options={{title: 'Tab1', tabBarIcon: (props) => <Text style={{color: props.color, fontSize: props.size}}>Wena</Text>}} component={Tab1Screen} /> */}
      <BottomTabIOS.Screen name="Tab1Screen" options={{title: 'Tab1'}} component={Tab1Screen} />
      <BottomTabIOS.Screen name="TopTabNavigator" options={{ title: 'Tab2'}} component={TopTabNavigator} />
      <BottomTabIOS.Screen name="StackNavigator" options={{ title: 'Stack'}} component={StackNavigator} />
    </BottomTabIOS.Navigator>
  );
}