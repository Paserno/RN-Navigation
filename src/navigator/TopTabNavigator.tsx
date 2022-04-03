import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { ChatScreen } from '../screens/ChatScreen';
import { ContactsScreen } from '../screens/ContactsScreen';
import { AlbumsScreen } from '../screens/AlbumsScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colores } from '../theme/appTheme';
import { Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export const TopTabNavigator = () => {
  // Este elemento sirve para detectar si el dispositivo tiene un Notch, como en el caso de los iPhones.
  const { top } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      style={{
        paddingTop: top
      }}
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={ ({ route }) => ({
        tabBarPressColor: colores.primary,
        tabBarShowIcon: true,
        tabBarIndicatorStyle:{
          backgroundColor: colores.primary,
        },
        tabBarStyle:{ // En el caso que se quiera eliminar la sombra 
          shadowColor: 'transparent',
          elevation: 0,
          // backgroundColor: '#694FAB',
        },
        tabBarIcon : ({color, focused})  => {

          let iconName: string = '';

          switch (route.name) {
            
            case 'Chat':
              iconName = 'chatbox-ellipses-outline'
              break;
            case 'Contacts':
              iconName = 'people-outline'
              break;
            case 'Albums':
              iconName = 'albums-outline'
              break;
          
            default:
              break;
          }
       return <Icon name={iconName} size={23} color={color} />
          // return <Text style={{color}}>{ iconName }</Text>
        },
      })}
    >
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Albums" component={AlbumsScreen} />
    </Tab.Navigator>
  );
}