import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
// import { StackNavigator } from './StackNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Image, useWindowDimensions, View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../theme/appTheme';
import { Tabs } from './Tabs';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {

  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={ (props) => <MenuInterno { ...props }/>}
      screenOptions={{
        drawerType: width >= 768 ? 'permanent' : 'front',
        headerShown: false,
        // headerShown: width >= 768 ? false : true,
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
      <Drawer.Screen name="Tabs" component={ Tabs } />
      {/* <Drawer.Screen name="StackNavigator" component={ StackNavigator } /> */}
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

const MenuInterno = ( { navigation }: DrawerContentComponentProps) => {

  return (
    <DrawerContentScrollView>

      {/* Parte del Avatar */}
      <View style={ styles.avatarContainer }>
        <Image
          source={{
            uri: 'https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif'
          }}
          style={ styles.avatar }
        />
      </View>
      
      {/* Opciones de Menú */}
      <View style={ styles.menuContainer }>
            
          <TouchableOpacity 
            style={ styles.menuBoton}
            onPress={ () => navigation.navigate('Tabs') }
          >
            <Text style={ styles.menuTexto }>Tabs</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity 
            style={ styles.menuBoton}
            onPress={ () => navigation.navigate('StackNavigator') }
          >
            <Text style={ styles.menuTexto }>Navegación</Text>
          </TouchableOpacity> */}

          <TouchableOpacity 
            style={ styles.menuBoton}
            onPress={ () => navigation.navigate('SettingsScreen') }
          >
            <Text style={ styles.menuTexto }>Ajustes</Text>
          </TouchableOpacity>

      </View>

    </DrawerContentScrollView>
    );
}