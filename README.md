> __Elemento Anterior 👀:__ __[Calculadora en React Native](https://github.com/Paserno/RN-Calculadora)__
# Navigation App
Esta es una aplicación hecha con React Native, que establece diferentes tipos de navegaciones.

Elementos utilizados:
* __[React Navigation](https://reactnavigation.org/docs/getting-started)__

----
Recordar que si se desea ejecutar esta aplicación, deben de reconstruir los módulos de node así:
````
npm install
````
En el caso de tener Android Studio con un dispositivo virtual montado para ejecutar es:
````
npx react-native run-android
````

----
### 1.- React Navigator - Stack
En este punto se realiza la configuración de __[React Navigation](https://reactnavigation.org/docs/getting-started)__.

Pasos a Seguir:
* Se crearon las diferentes carpetas `src/`
    * `navigator/` donde se tendra la configuración del stack de navegaciones.
    * `screens/` donde se tendra las diferentes pantallas a mostrar.
    * `theme/` los estilos que se utilizarán.
* Importar en el componente __App__ el __StackNavigator__.

En `navigator/StackNavigator.tsx`
* Previamente se crearon paginas por defectos.
* Se importa React ya que se realizará un renderizado.
* Se importa el elemento instalado llamado __stack__.
* Finalmente se importan todas las pantallas por defecto que se utilizarán.
````
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Pagina1Screen } from '../screens/Pagina1Screen';
import { Pagina2Screen } from '../screens/Pagina2Screen';
import { Pagina3Screen } from '../screens/Pagina3Screen';
````
* Se realiza la __[configuración](https://reactnavigation.org/docs/stack-navigator#api-definition)__ para el manejo de las pantalla de manera stack.
````
export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pagina1Screen" component={ Pagina1Screen} />
      <Stack.Screen name="Pagina2Screen" component={Pagina2Screen} />
      <Stack.Screen name="Pagina3Screen" component={Pagina3Screen} />
    </Stack.Navigator>
  );
}
````
En `App.tsx`
* Se importa y se implementa el `<StackNavigator>`.
````
return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
````
----
### 2.- Navegar a Otras Pantallas
En este punto se realizará las diferentes navegaciónes del Stack Navigator

Paso a Seguir:
* Implementar en las 3 pantallas diferentes navegaciones.

En `screens/Pagina1Screen.tsx`
* Se impoirta `StackScreenProps` para ayudar con el tipado con Typescript. 
````
import { StackScreenProps } from '@react-navigation/stack';
...
````
* Se implementa un __interface__ que extendera el elemento `StackScreenProps`.
````
interface Props extends StackScreenProps<any, any>{};
````
* Se le agrega el tipado a lo que se recibe por las props.
* Se le agrega un estilo al __View__.
* En el boton se le agrega lo que se recibe por las props, para enviarlo a la pantalla `Pagina2Screen`.
````
export const Pagina1Screen = ( { navigation }: Props ) => {
  return (
    <View style={ styles.globalMargin }>
        <Text> Pagina1Screen </Text>

        <Button 
          title='Ir Página 2'
          onPress={ () => navigation.navigate('Pagina2Screen') }
        />
    </View>
  )
}
````
En `screens/Pagina2Screen.tsx`
* Se importa el __useNavigation__ con `CommonActions`.
````
import { CommonActions, useNavigation } from '@react-navigation/native';
...
````
* Se utiliza el customHook __useNavigation__.
* Se utiliza en el __Botton__ el hook para realizar la navegación, [aquí se puede ver un ejemplo](https://reactnavigation.org/docs/use-navigation/#example).
````
const navigator = useNavigation();

  return (
    <View style={ styles.globalMargin }>
        <Text> Pagina2Screen </Text>

        <Button 
          title="ir Página 3"
          onPress={ () => navigator.dispatch(CommonActions.navigate({name: 'Pagina3Screen'})) }
        />
    </View>
  )
````
En `screens/Pagina3Screen.tsx`
* Se importa `StackScreenProps` para tener ayuda de tipado.
````
...
import { StackScreenProps } from '@react-navigation/stack';
````
* Se implementa una __interface__ para tener el tipado con ayuda de __StackScreenProps__.
````
interface Props extends StackScreenProps<any, any>{};
````
* Se implementan 2 nuevos botones uno con `navigation.pop()` que destruira la pantalla y el otro boton con `navigation.popToTop()` que volverá al inicio 
````
<Button 
  title='Regresar'
  onPress={ () => navigation.pop() }
/>
<Button 
  title='Ir al Home'
  onPress={ () => navigation.popToTop() }
/>
````
----