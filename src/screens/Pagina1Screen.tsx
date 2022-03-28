import { DrawerScreenProps } from '@react-navigation/drawer';
// import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { styles } from '../theme/appTheme';

// interface Props extends StackScreenProps<any, any>{};
interface Props extends DrawerScreenProps<any, any>{};

export const Pagina1Screen = ( { navigation }: Props ) => {

  useEffect(() => {

    navigation.setOptions({
      headerLeft: () => (
      <Button
        title='Menú'
        onPress={ () => navigation.toggleDrawer() }
      />
      ) 
    })
    
  }, [])
  

  return (
    <View style={ styles.globalMargin }>
      <Text style={ styles.title }>Pagina1Screen </Text>

      <Button
        title='Ir Página 2'
        onPress={() => navigation.navigate('Pagina2Screen')}
      />

      <Text style={{ 
        marginVertical: 20,
        fontSize: 18,
        // marginLeft: 7
       }}>
         Navegar con Argumentos
      </Text>

      <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity
          style={{ 
            ...styles.botonGrande,
            backgroundColor: '#5856D6'
          }}
          onPress={() => navigation.navigate('PersonaScreen', {
            id: 1,
            nombre: 'Pedro'
          })}
        >
          <Text style={ styles.botonGrandeText }>Pedro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ 
            ...styles.botonGrande,
            backgroundColor: '#BB1BE0'
          }}
          onPress={() => navigation.navigate('PersonaScreen', {
            id: 2,
            nombre: 'Maria'
          })}
        >
          <Text style={ styles.botonGrandeText }>Maria</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
