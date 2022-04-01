> __Elemento Anterior 👀:__ __[Calculadora en React Native](https://github.com/Paserno/RN-Calculadora)__
# Navigation App
Esta es una aplicación hecha con React Native, que establece diferentes tipos de navegaciones.

Elementos utilizados:
* __[React Navigation](https://reactnavigation.org/docs/getting-started)__
  * __[Stack Navigation](https://reactnavigation.org/docs/native-stack-navigator/)__
  * __[Drawer Navigator](https://reactnavigation.org/docs/drawer-navigator/)__

  * __[Botton Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)__
  


Solución Problema.
* __[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)__ En uso de __Drawer Navigator__
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
### 6.- Configurar Drawer 
En este punto se realizará la configuración del Drawer que se utilizará.

Pasos a Seguir: 
* Se instala __[Drawer](https://reactnavigation.org/docs/drawer-navigator/)__.
* En `navigator/` se crea un nuevo archivo donde tendrá la configuración del drawer.
* Se modifica __App__ para el manejo del nuevo Menu lateral.

En `navigator/MenuLateralBasico.tsx`
* Se implementa la __[Configuración](https://reactnavigation.org/docs/drawer-navigator/#api-definition)__ que se encuentra en la documentación.
* Importamos diferentes elementos como __React__, `createDrawerNavigator` de la documentación y los elementos que se utilizarán.
````
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
````
* Implementamos el `StackNavigator` y  `SettingsScreen` que es un nuevo componente.
````
const Drawer = createDrawerNavigator();

export const MenuLateralBasico = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="StackNavigator" component={ StackNavigator } />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
````
En `App.tsx`
* Se importa el nuevo elemento implementado.
````
import { MenuLateralBasico } from './src/navigator/MenuLateralBasico';
````
* Y se agrega en el return de __App__.
````
return (
    <NavigationContainer>
      <MenuLateralBasico />
    </NavigationContainer>
  )
````
----
### 7.- Mostrar / Ocultar - Drawer
En este punto se utilizará el tamaño de la pantalla para mostrar la navegación lateral, para verificar si esta el teléfono horizontal o vertical.

Pasos a Seguir:
* Se crea un botón para abrir el Drawer en `screens/Pagina1Screen.tsx`.
* Se agrega la configuración en el navigator llamado `MenuLateralBasico.tsx`, para que detecte si la pantalla esta horizontal o Vertical.

En `screens/Pagina1Screen.tsx`
* Se crea un __useEffect__ con ninguna dependencia para cuando se realize la compilación del componente se ejecute.
* Se utiliza `navigation.setOptions`, donde en la parte superior de la vista se crea un botón.
  * Este botón tendrá la opción de abrir el Drawer.
````
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
````
En `navigator/MenuLateralBasico.tsx`
* Importamos `useWindowDimensions`.
* Extraemos la propiedad `width` de __useWindowDimensions__.
````
const { width } = useWindowDimensions();
````
* Le agregamos propiedades al __Drawer Navigator__ con `screenOptions`.
* Utilizando el width de `useWindowDimensions()`, realizamos una validación, en el caso que la pantalla sea mayor o igual a `768`, se mostrara siempre el drawer lateral.
* Al igual con `headerShown` realizamos una condición, para no mostrar el __Header__ o mostrarlo.
* Ademas de otros elementos para que se muestre de una forma mas estilizado.
````
<Drawer.Navigator
  screenOptions={{
    drawerType: width >= 768 ? 'permanent' : 'front',
    headerShown: width >= 768 ? false : true,
    headerStyle: {
      elevation: 0,
      shadowColor: 'transparent' // Para IOS
    },
    drawerStyle: {
        width:  width >= 768 ? 180 : 250
    }
}}
>
...
</Drawer.Navigator>
````
----
### 8.- Drawer Personalizado
En este punto lo que se hará es personalizar el menú lateral, a elección.

Pasos a Seguir:
* Duplicar `MenuLateralBasico.tsx` y a la copia agregarle el nombre de `MenuLateral.tsx` esto en la 📂carpeta `navigator/`.
* En `navigator/MenuLateral.tsx` se agrega una nuevo componente llamado `MenuInterno`, donde tendra el contenido del Menú Lateral.
* Se agregan algunos estilos en `theme/appTheme.tsx`.

En `navigator/Menulatera.tsx`
* Agregamos `drawerContent` que es una función que permite personalizar el Drawer.
  * Se utiliza los __props__, para luego le pasamos todos los argumentos de `props` al componente que se creará, llamado `MenuInterno`.
````
<Drawer.Navigator
  drawerContent={ (props) => <MenuInterno { ...props }/>}
  ...
>
</Drawer.Navigator>
````
* A bajo del componente __MenuLateral__, se crea el componente __MenuInterno__ que recibirá por parametro las __props__ y de tipado importamos `DrawerContentComponentProps`.
* Realizamos un return que devolverá varios elementos, estos elementos los encerramos en un `<DrawerContentScrollView>`.
  * Con un view que tendra estilos y una imagen.
````
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
````
En `theme/appTheme`
* Agregamos 2 nuevos estilos, el primero `avatarContainer` el cual haremos un centrado del contenido y con un margen, el segunod `avatar` dará el tamaño a la imagen con una forma circular.
````
avatarContainer: {
    alignItems: 'center',
    marginTop: 20
},
avatar: {
    width: 150,
    height: 150,
    borderRadius: 100
}
````
----
### 9.- Navegación del Menú Lateral
En este punto se realizará la navegación hacia los diferentes componentes.

Pasos a Seguir:
* Se Creará nuevos botones en __MenuInterno__, que permitirá la navegación.
* Se agregaran algunos estilos.

En `navigator/MenuLateral.tsx`
* Los props los desestructuramos y se extrae `navigation`.
````
const MenuInterno = ( { navigation }: DrawerContentComponentProps) => { ... }
````
* En el __MenuInterno__ dentro del `<DrawerContentScrollView>`, abajo de la imagen se agregará un __View__ con el contenido.
* Principalmente se crea 2 botones con `<TouchableOpacity>` que hará la redirección.
* Se agregaran algunos estilos al `View`, `TouchableOpacity` y el `Text`.
````
<View style={ styles.menuContainer }>
    
  <TouchableOpacity 
    style={ styles.menuBoton}
    onPress={ () => navigation.navigate('StackNavigator') }
  >
    <Text style={ styles.menuTexto }>Navegación</Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={ styles.menuBoton}
    onPress={ () => navigation.navigate('SettingsScreen') }
  >
    <Text style={ styles.menuTexto }>Ajustes</Text>
  </TouchableOpacity>

</View>
````
En `theme/appTheme.tsx`
* Se crean 3 nuevos estilos.
````
menuContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
},
menuBoton: {
    marginVertical: 10,
},
menuTexto: {
    fontSize:20
},
````
----
### 10.- Bonus: useSafeAreaInserts
Se utilizará un Hook para evitar tener problemas con el notch de los teléfonos iphone, ya que tienen la camara en una posición no favorable en algunos casos, para esto se utilizará `useSafeAreaInserts`.

Pasos a Seguir:
* Se agrega el Hook en `screens/SettingsScreen.tsx`.

En `screens/SettingsScreen.tsx`
* Se importa `useSafeAreaInsets`.
* Se le agrega algunos estilos, ademas de un `marginTop: insets.top + 20` para no tener problemas con el __notch de los iPhones__.
````
export const SettingsScreen = () => {

  const insets = useSafeAreaInsets();

  return (
      <View style={{
          ...styles.globalMargin,
          marginTop: insets.top + 20
          }}>
          <Text style={ styles.title }>Settings Screen</Text>
      </View>
  )
}
````
----
# Elementos de Navegación Tabs
En este punto se veran diferentes navegaciónes relacionadas al Tabs.

Elementos a utilizar
* __[Botton Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)__

----
### 1.- Crear el BottomTabNavigator
En este punto se realizará la instalación de __[Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/#installation)__, para luego implementarlo.

Pasos a Seguir:
* Realizar la instalación de __Bottom Tabs Navigator__.
* Se crean 3 screens que seran usadas por los __Bottom Tabs__. 
* Crear un archivo en `navigator/Tabs.tsx` donde se hara la configuración para mostrar los elementos Tabs.
* Agregar componente __Tabs__ en `navigator/MenuLateral.tsx`.

En `screens/Tab1Screen.tsx`
* Se crea un componente basico que será utilizado por la configuración de __Bottom Tabs__, para luego ser mostrado, esto se replica 3 veces, para tener 3 componentes que se mostrarán.
````
import React from 'react'
import { View, Text } from 'react-native';

export const Tab1Screen = () => {
  return (
    <View>
        <Text> Tab1Screen </Text>
    </View>
  )
}
````
En `navigator/Tabs.tsx`
* Se copia lo que sale en la documentación y ademas agregamos los componentes recien creados.
* Se agregan los componentes screens en `<Tab.Navigator>`, para que sean mostrado.
````
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1Screen } from '../screens/Tab1Screen';
import { Tab2Screen } from '../screens/Tab2Screen';
import { Tab3Screen } from '../screens/Tab3Screen';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1Screen" component={Tab1Screen} />
      <Tab.Screen name="Tab2Screen" component={Tab2Screen} />
      <Tab.Screen name="Tab3Screen" component={Tab3Screen} />
    </Tab.Navigator>
  );
}
````
En `navigator/MenuLateral.tsx`
* Se importa el componente __Tabs__.
````
import { Tabs } from './Tabs';
````
* En el return de __MenuLateral__ se agrega el __Tabs Navigator__.
````
<Drawer.Navigator>
  <Drawer.Screen name="Tabs" component={ Tabs } />
  ...
</Drawer.Navigator>
````
----
### 2.- Personalizar BottomTabsNavigator
En este punto se agregaron algunos estilos a los __Tabs Navigator__.

Pasos a Seguir:
* Se agregaron __useEffect__ en los componentes screens de los Tabs Navigator.
* Se utilizaron algunos estilos propios en el componente __Tabs__ para estilizar los botones Tabs.

En `screens/Tab1Screen.tsx`
* En cada componente se agrego el useEffect para ver como es llamado el __Tab Navigator__, se logro ver que los Tabs solo son renderizados la primera vez, luego se mantienen cargados.
````
useEffect(() => {
    console.log('Tab1Screen effect')

  }, [])
````
En `navigator/Tabs.tsx`
* Se importan 2 nuevos elementos, el primero el __StackNavigator__ de la sección pasada y unos estilos nuevos, para el manejo de colores.
````
...
import { StackNavigator } from './StackNavigator';
import { colores } from '../theme/appTheme';
````
* Se Agregaron algunos estilos al Tab Navigator, utilizando algunas de sus propiedades.
  * Con `sceneContainerStyle` estilizamos el contenido del screen, `backgroundColor` agregandole un color blanco.
* Con `screenOptions` agregamos todos los estilos adicionales.
  * Con `tabBarInactiveTintColor` y `tabBarActiveTintColor` se le agrega color a los iconos y etiquetas.
  * `tabBarActiveBackgroundColor` color en el fondo cuando el tab esta seleccionado.
  * `tabBarStyle` Con este elemento se estiliza la barra del Tab, agregandole alguos bordes o elementos personalizados.
````
<Tab.Navigator
  sceneContainerStyle={{
    backgroundColor: 'white'
  }}

  screenOptions={{
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'white',
    tabBarActiveBackgroundColor: colores.primary,
  
    tabBarStyle: {
      
      borderTopColor: colores.primary,
      borderTopWidth: 0,
      backgroundColor: colores.mate,
      elevation: 0,
      },
  }}  
>
````
----
### 3.- Prepara Iconos BottomTabsNavigator
En este punto se preparo el codigo donde estará los icons.

Pasos a Seguir:
* En el Tabs Navigator se modifico para implementar los iconos del __Tabs Navigator__.

En `navigator/Tabs.tsx`
* Se recibe por parametros `{ route }`, para detectar en que ruta esta el __Tabs Navigator__, esto se utilizará posteriormente.
````
<Tab.Navigator
  screenOptions={ ({ route }) => ({
    ... )}
>
````
* Se agrega `tabBarIcon` el cual se desestructura en diferentes elementos `{color, focused, size}`.
* Creamos una variable llamada `iconName`, ademas de un __switch__ el cual detectará el nombre de la ruta con `route.name`.
* Finalmente retornamos un `<Text>` con los estilos y el valor que nos entrega el __Switch__.
````
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
````
----