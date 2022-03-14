> __Elemento Anterior 👀:__ __[Calculadora en React Native](https://github.com/Paserno/RN-Calculadora)__
# Navigation App
Esta es una aplicación hecha con React Native, que establece diferentes tipos de navegaciones.

Elementos utilizados:
* __[React Navigation](https://reactnavigation.org/docs/getting-started)__
  * __[Stack Navigation](https://reactnavigation.org/docs/native-stack-navigator/)__
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
### 3.- Estilizando el Stack Navigator
En este punto se realizará unos cambios visuales para que se vea mas actual la aplicación.

Pasos a Seguir: 
* Agregar algunos estilos en las 3 Screen.
* Personalizar el __StackNavigator__.

En `navigator/StackNavigator.tsx`
* Se personaliza el header con `screenOptions`.
  * Se puede agregar una ruta principal con `initialRouteName`.
  * Se puede eliminar el header con `headerShown` en false.
  * En esta ocasión se agregará `headerStyle` para agregar estilos a la header, en este punto se usará `elevation` en 0, para no mostrar la linea divisora y `shadowColor` en el casos de IOS.
  * Ademas usa `cardStyle` para cambiar el color con `backgroundColor` de las cartas que conteiene el contenido.
````
<Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent' // Para IOS
        },
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
````
* Agregamos la propiedad `options` que cambiará los titulos en los headers.
````
<Stack.Screen name="Pagina1Screen" options={{ title:'Página 1'}} component={ Pagina1Screen} />
<Stack.Screen name="Pagina2Screen" options={{ title:'Página 2'}} component={Pagina2Screen} />
<Stack.Screen name="Pagina3Screen" options={{ title:'Página 3'}} component={Pagina3Screen} />
````
En `screens/Pagina2Screen.tsx`
* Se usará un __useEffect__ que se ejecutará cuando se inicie el compoente.
* Con ayuda del CustomHook __useNavigation__ se utiliza la propiedad `navigator.setOptions`, que en este caso cambiaremos el titulo y en IOS se usa `headerBackTitle` para agregar un mensaje en el boton "back".
````
useEffect(() => {
    navigator.setOptions({
      title: 'Hola Mundo',
      headerBackTitle: 'Atras' //para tener un back en IOS
    })
  }, [])
````
----
### 4.- Enviar Argumentos entre Pantallas
En este punto se creará una pantalla nueva donde recibirá argumentos.

Pasos a Seguir: 
* La pantalla __Pagina1Screen__ se modifica para enviar argumentos.
* Se crea una nueva pantalla.
* Se establece la nueva pantalla agregada en el __StackNavigator__.

En `screens/Pagina1Scren.tsx`
* Se importa un nuevo elemento a utilizar.
````
...
import { TouchableOpacity } from 'react-native-gesture-handler';
````
* Se implementa el boton `TouchableOpacity` que enviará los argumentos a la otra pantalla, con `navigation.navigate` enviando un segundo argumento.
````
<Text>Navegar con Argumentos</Text>

<TouchableOpacity 
  onPress={ () => navigation.navigate('PersonaScreen', {
    id: 1,
    nombre: 'pedro'
  }) }
> 
  <Text>Pedro</Text>
</TouchableOpacity>
````
En `screens/PersonaScren.tsx`
* Se implementa una `interface` que extiende `StackScreenProps`.
````
interface Props extends StackScreenProps<any, any>{};
````
* Se desestructura por los parametros el `route` y `navigation`. 
````
export const PersonaScreen = ( { route, navigation }:Props) => {...}
````
* Guardamos en una constante lo que viene en `route.params`.
* Se implementa un __useEffect__ con ninguna dependencia, se utiliza `navigation.setOptions` para agregar un titulo al header.
* Se utiliza el signo de __"!"__ exlamación para forzar el tipado `params!.nombre`.
````
const params = route.params;

useEffect(() => {
    navigation.setOptions({
        title: params!.nombre,
    })
}, [])
````
* Se retorna lo recibido por los parametros.
````
return (
  <View style={ styles.globalMargin }>
      <Text style={ styles.title }>{JSON.stringify(params, null, 3)}</Text>
  </View>
)
````
En `navigator/StackNavigator.tsx`
* Se agrega la nueva pantalla en el __StackNavigator__.
````
<Stack.Screen name="PersonaScreen" options={{ title:'Persona'}} component={PersonaScreen} />
````
----
### 5.- Tipado de Argumento.
Exsiten 2 tipodos de formas de hacer un tipado en este punto, una crear una interface en la propia pantalla que recibira los datos, o crearlo en el __StackNavigator__.

Pasos a Seguir:
* Se crea el tipado en el __StackNavigator__.
* Se modifica la pantalla de __PersonaScreen__.
* Se agrega otro botón en la pantalla __Pagina1Screen__, para enviarle argumentos a otra pantalla, ademas de algunos estilos.

En `navigator/StackNavigator.tsx`
* Se agrega un `type` con su nombre, y se define los elementos de cada pantalla, en este caso solo __PersonaScreen__ recibirá argumentos.
* Este `type` se lo agregamos al Stack.
````
export type RootStackParams = {
  Pagina1Screen: undefined,
  Pagina2Screen: undefined,
  Pagina3Screen: undefined,
  PersonaScreen: { id: number, nombre: string },
}

const Stack = createStackNavigator<RootStackParams>();
````
En `screens/PersonaScreen.tsx`
* Se importa el tipado que viene del __StackNavigator__.
````
...
import { RootStackParams } from '../navigator/StackNavigator';
````
* Se agrega el tipado en la _interface_ extendida `<RootStackParams, 'PersonaScreen'>`.
````
interface Props extends StackScreenProps<RootStackParams, 'PersonaScreen'>{};
````
* Se elimina el signo de exclamación "!" que tenía `params.nombre`.
````
useEffect(() => {
    navigation.setOptions({
        title: params.nombre,
    })
}, [])
````
En `screens/Pagina1Screen.tsx`
* Se agrega un __View__ con un estilo `flexDirection: 'row'` para mostrar los botones.
* Se agrega un nuevo botón `TouchableOpacity` que se le pasará nuevos parametros y con estilos incluidos, colores diferentes en los botones para identificarlos.
* Se agrega unos estilos a los texto del botón para darle mayor personalización.
````
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
````
----
