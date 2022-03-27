import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Image, useWindowDimensions, View } from 'react-native';
import { styles } from '../theme/appTheme';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {

  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={ (props) => <MenuInterno { ...props }/>}
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
      <Drawer.Screen name="StackNavigator" component={ StackNavigator } />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

const MenuInterno = ( props: DrawerContentComponentProps) => {

  return (
    <DrawerContentScrollView>
      <View style={ styles.avatarContainer }>
        <Image
          source={{
            uri: 'https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif'
          }}
          style={ styles.avatar }
        />
      </View>
    </DrawerContentScrollView>


    );
}