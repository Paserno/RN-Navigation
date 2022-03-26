import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export const MenuLateralBasico = () => {

  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: width >= 768 ? 'permanent' : 'front',
        headerShown: width >= 768 ? false : true,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent' // Para IOS
        },
        drawerStyle: {
            // backgroundColor: '#9B96F5',
            width:  width >= 768 ? 180 : 250
        }
    }}
    >
      <Drawer.Screen name="StackNavigator" options={{ title: 'Home'}} component={ StackNavigator } />
      <Drawer.Screen name="SettingsScreen" options={{ title: 'Settings'}} component={SettingsScreen} />
    </Drawer.Navigator>
  );
}