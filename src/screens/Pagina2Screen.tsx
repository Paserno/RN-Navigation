import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native';
import { styles } from '../theme/appTheme';

export const Pagina2Screen = () => {

  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      title: 'Hola Mundo',
      headerBackTitle: 'Atras' //para tener un back en IOS
    })
  }, [])
  

  return (
    <View style={ styles.globalMargin }>
        <Text style={ styles.title }> Pagina2Screen </Text>

        <Button 
          title="ir Página 3"
          onPress={ () => navigator.dispatch(CommonActions.navigate({name: 'Pagina3Screen'})) }
        />
    </View>
  )
}
