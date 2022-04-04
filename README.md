> __Elemento Anterior 👀:__ __[Calculadora en React Native](https://github.com/Paserno/RN-Calculadora)__
# Navigation App
Esta es una aplicación hecha con React Native, que establece diferentes tipos de navegaciones.

Elementos utilizados:
* __[React Navigation](https://reactnavigation.org/docs/getting-started)__
  * __[Stack Navigation](https://reactnavigation.org/docs/native-stack-navigator/)__
  * __[Drawer Navigator](https://reactnavigation.org/docs/drawer-navigator/)__

  * __[Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)__
  * __[Material Bottom Tab Navigator](https://reactnavigation.org/docs/material-bottom-tab-navigator)__ _(OPCIONAL)_
  * __[Material Top Tab Navigator](https://reactnavigation.org/docs/material-top-tab-navigator)__
  


Solución Problema.
* __[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)__ En uso de __Drawer Navigator__
* __[RN Vector Icons](https://github.com/oblador/react-native-vector-icons#readme)__ Como configurar para los diferentes dispositivos, tanto para Android como IOS


__[Elementos de Navegación Tabs](https://github.com/Paserno/RN-Navigation#elementos-de-navegación-tabs)__

----
Recordar que si se desea ejecutar esta aplicación, deben de reconstruir los módulos de node así:
````
npm install
````
En el caso de tener Android Studio con un dispositivo virtual montado para ejecutar es:
````
npx react-native run-android
````
> __Elemento Posterior 👀:__ __[...](https://github.com/Paserno/RN-Calculadora)__
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
### 4.- Material Bottom Tab Navigator
En este punto se utilizará un nuevo __Bottom Tab Navigator__, este solo se mostrará en Android, este elemento se vera mejor visualmente.

Pasos a Seguir: 
* Instalar __[Material Bottom Tab Navigator](https://reactnavigation.org/docs/material-bottom-tab-navigator)__.
* Se adaptara `navigator/Tabs.tsx` para poder recibir el nuevo __Bottom Tab__.

En `navigator/Tabs.tsx`
* Se importan 3 elementos nuevos.
  * `createMaterialBottomTabNavigator` para crear el nuevo Bottom Tab.
  * `MaterialCommunityIcons` para probar con los icons que viene.
  * `Platform` de __React Native__ para detectar en que dispositivo se esta corriendo la aplicación.
````
...
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform, Text } from 'react-native';
````
* Se crea la función `Tabs` _(renombrando las otras funciones)_.
* Se retorna una condición ternaria, en el caso que `Platform.OS` sea igual a ios, se mostrará el componente `<TabsIOS />` _(el cual se renombro, antes era Tabs)_ y para android el elemento que se creará a continuación.
````
export const Tabs = () => {

  return Platform.OS === 'ios'
          ? <TabsIOS />
          : <TabsAndroid />
}
````
* Se crea el nuevo Bottom Tabs, que viene de la nueva instalación, esta función la llamaremos `TabsAndroid`.
````
const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {...}
````
* Aquí mostramos el return de la función `TabsAndroid`.
* Le agregamos algunas propiedades al `<BottomTabAndroid.Navigator>`, como el color al activarse, el color cuando esta inactivo y un color de fondo general pero principalmente se agrega una propiedad para que pueda funciónar la animación de coloreado del fondo, el cual se verá muy bien, esta es `shifting` en `true`, sin esta propiedad no funcionará el coloreado del fondo _(backgroundColor)_.
* Ahora en los 3 `<BottomTabAndroid.Screen>` agregamos las mismas propiedades con colores diferentes para ver la animación del __Material Bottom Tabs__, estas son las siguientes.
  * `name` esta va asociada al nombre de la navegación o pantalla asociada.
  * `component` es el componente al cual se ira a navegar.
  * `options` se utiliza `tabBarLabel` para el texto que saldrá en la etiqueta, `tabBarColor` para el color de fondo cuando este activo el Tab y finalmente el `tabBarIcon` que recibe por parametros `{color}` aquí mostrará el icono, en este caso se puso uno por defecto.
````
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
      name="Tab2Screen" 
      component={Tab2Screen}
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
````
* Mencionar que estos elementos se les cambio el nombre, antes `BottomTabIOS` llamandose `Tabs` y la función `TabsIOS` tambien llamandoce antes `Tabs`. 
````
const BottomTabIOS = createBottomTabNavigator();

const TabsIOS = () => {...}
````
----
### 5.- Material Top Tab Navigator
En este punto se implementará un Top Tab Navigator, para mostrar diferentes elementos.

Pasos a Seguir: 
* Instalar [Material Top Tabs Navigator](https://reactnavigation.org/docs/material-top-tab-navigator/).
* Crear 3 componentes Screen, para mostrarlos en el __Top Tab Navigator__.
* Crear un archivo para agregar la configuración en `navigator/TopTabNavigator.tsx` segun la [documentación](https://reactnavigation.org/docs/material-top-tab-navigator/#installation).
* Se implementa el __Top Tab Navigator__ en el __Bottom Tabs__, tanto en el de Android como el de IOS.
* En el caso de __presentar problemas__ instalar lo siguiente; `yarn add react-native-pager-view`. _(En el caso de no tener ningun problema saltar este paso, esto es recomendado al momento de construir o replicar los mismos elementos de este repositorio)_

En `screen/ChatScreen.tsx`
* Crear 3 componentes basicos para mostrarlo en el __Top Tab Navigator__. _(Se crearon ChatScreen, ContactsScreen y AlbumsScreen)_
````
import React from 'react'
import { View, Text } from 'react-native';

export const ChatScreen = () => {
  return (
    <View>
        <Text>ChatScreen</Text>
    </View>
  )
}
````
En `navigator/TopTabNavigator.tsx`
* Se importa React, `createMaterialTopTabNavigator` segun la documentación y los 3 componentes que se crearon.
````
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ChatScreen } from '../screens/ChatScreen';
import { ContactsScreen } from '../screens/ContactsScreen';
import { AlbumsScreen } from '../screens/AlbumsScreen';
````
* Se implementa el TopTabNavigator segun la documentación.
* Ademas se agregan los 3 componentes creados `ChatScreen`, `ContactsScreen` y `AlbumsScreen`.
````
const Tab = createMaterialTopTabNavigator();

export const TopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Albums" component={AlbumsScreen} />
    </Tab.Navigator>
  );
}
````
En `navigator/Tabs.tsx`
* Importamos el `TopTabNavigator`.
````
...
import { TopTabNavigator } from './TopTabNavigator';
````
* Estamos en la componente `TabsAndroid`.
* Remplazamos el `Tab2Screen` por `TopTabNavigator`.
````
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
````
* En el componente `TabsIOS`, remplazamos `Tab2Screen` por `TopTabNavigator`.
````
<BottomTabIOS.Screen name="TopTabNavigator" options={{ title: 'Tab2'}} component={TopTabNavigator} />
````
----
### 6.- Personalizar Material Top Tab Navigator
En este punto se personalizará el __Material Top Tabs Navigator__.

Pasos a Seguir:
* Utilizamos algunas de las propiedades en `navigator/TopTabNavigator.tsx` para darle una personalización.

En `navigator/TopTabNavigator.tsx`
* Importamos algunos elementos nuevos, como `useSafeAreaInsets` este Hook es para evitar el notch en el caso de presentar uno como en los iPhone, `colores` el cual es unos estilos de colores que se establecieron anteriormente y Text de React Native.
````
...
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colores } from '../theme/appTheme';
import { Text } from 'react-native';
````
* Para evitar el notch de los iphone se agrega el hook `useSafeAreaInsets` desestructurando el `top`.
````
export const TopTabNavigator = () => {

  const { top } = useSafeAreaInsets();
  ...}
````
* Aquí se agregaron algunos de los estilos para el __Top Tap Navigator__.
  * `paddingTop: top` en el caso que se tenga un notch se creará un padding.
  * Con `sceneContainerStyle={{backgroundColor: 'white'}}` las pantallas sin contenido el fondo sera blanco.
* Se utiliza `screenOptions` para las diferentes opciones visuales, tambien recibiendo por paramentro `route` que se utilizará posteriormente.
  * `tabBarPressColor: colores.primary` para cuando se presionen los botones del Top Tab se mueste con un color.
  * `tabBarShowIcon: true` esta propiedad la dejamos en ese estado para proximamente mostrar los iconos.
  * En `tabBarIndicatorStyle` le damos un `backgroundColor` para cuando la pestaña que este seleccionada se le muestre un borde inferior con el color desado.
  * Con `tabBarStyle` le agregamos algunos estilos a la barra, una transparencia y elevacion en 0, para que no se vea ninguna sombra o separación. _(De los Top Tab con el contenido que se muestre)_
  * Se utiliza `tabBarIcon` para mostrar los iconos.
````
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
    tabBarStyle:{ 
      shadowColor: 'transparent',
      elevation: 0,
      // backgroundColor: '#694FAB',
    },
    tabBarIcon : ({color, focused})  => {

      let iconName: string = '';

      switch (route.name) {
        
        case 'Chat':
          iconName = 'CH'
          break;
        case 'Contacts':
          iconName = 'CO'
          break;
        case 'Albums':
          iconName = 'AL'
          break;
      
        default:
          break;
      }

      return <Text style={{color}}>{ iconName }</Text>
    },
  })}
>
````
----
### 7.- Instalar Iconos
En este punto se Instalaran los inconos y se realizaran configuraciónes para que los iconos sean mostrado en las diferentes plataformas.

Pasos a Seguir:
* Para la instalación de Iconos es recomendado instalar lo siguiente:
  * `yarn add react-native-vector-icons` (_Paquetes de iconos usando Yarn para la instalación_)
  * `yarn add -D @types/react-native-vector-icons` (_En el caso de estar trabajando con __TypeScript__._)
  * `npx react-native link react-native-vector-icons` (_[Opcion Recomendada para mostrar Iconos en IOS](https://github.com/oblador/react-native-vector-icons#option-with-react-native-link)_)
* Luego de haber instalado los diferentes elementos es hora de realizar la instalación manual tanto en Android como en IOS.
  * Intrucciones de Android Realizadas en este proyecto __[Clic Aquí](https://github.com/oblador/react-native-vector-icons#option-with-gradle-recommended)__, mencionar que se personalizo los paquetes de iconos para solo usar __[Ionicons](https://ionic.io/ionicons)__
  * En el caso de IOS solo se realizo las __[Opciones con `react-native link` ](https://github.com/oblador/react-native-vector-icons#option-with-react-native-link)__, ya que no contamos hoy con un dispositivo Mac OS, en el caso de tenerlo se podrian hacer las diferentes _[Opciones](https://github.com/oblador/react-native-vector-icons#ios)_.
* Una vez toda la configuración de iconos lista se procedio a llenar la aplicación con iconos donde antes no habian.
  * Comenzando con `screen/Tab1Screen.tsx`.
  * `navigator/Tabs.tsx` 
  * `navigator/TopTabNavigator.tsx`
  * `screens/Pagina1Screen.tsx`
  * `navigator/MenuLateral.tsx`
  * `screens/SettingsScreen.tsx`

En `screen/Tab1Screen.tsx`
* Se importaron los Iconos de Ionicons.
````
...
import Icon from 'react-native-vector-icons/Ionicons';
````
* Invocando en el componente varios iconos con un tamaño y color.
````
<Text>
  <Icon name="airplane-outline" size={80} color={ colores.primary } />
  <Icon name="airplane" size={80} color={ colores.primary } />
  <Icon name="home" size={80} color={ colores.primary } />
  <Icon name="home-outline" size={80} color={ colores.primary } />
  <Icon name="chatbox-ellipses-outline" size={80} color={ colores.primary } />
  <Icon name="chatbox-ellipses" size={80} color={ colores.primary } />
  <Icon name="duplicate-outline" size={80} color={ colores.primary } />
  <Icon name="heart-outline" size={80} color={ colores.primary } />
  <Icon name="heart" size={80} color={ colores.primary } />
  <Icon name="images-outline" size={80} color={ colores.primary } />
  <Icon name="images" size={80} color={ colores.primary } />
  <Icon name="mic" size={80} color={ colores.primary } />
</Text>
````
En `navigator/Tabs.tsx`
* En cada Bottom Tab agregando un icono personalizado.
````
<BottomTabAndroid.Screen 
  name="Tab1Screen" 
  component={Tab1Screen}
  options={{
    tabBarLabel: 'Tab1',
    tabBarColor: '#009387',
    tabBarIcon: ({color}) => (
      <Icon name='images' color={color}  size={20}/>
    ),
  }}  
/>
````
En `navigator/TopTabNavigator.tsx`
* Los _"Iconos"_ que se tenía, ahora se remplazan con nombres de iconos de Ionicons para agregarlos a asignarlo a la variable y luego se muestre en el retorno, con un tamaño y color. 
````
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
},
````
En `screens/Pagina1Screen.tsx`
* En el __useEffect__ se remplazo el `botton` que se tenía por un `TouchableOpacity`.
* Para luego agregarle algunas propiedades y finalmente el icono de menú. _(Este igual agregandolo en `screens/SettingsScreen.tsx`)_
````
useEffect(() => {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={{marginLeft: 10}}
        onPress={ () => navigation.toggleDrawer() }
      >
        <Icon name="menu" size={35} color="black" />
      </TouchableOpacity>
    ) 
  })
}, [])
````
En `navigator/MenuLateral.tsx`
* En los botones `TouchableOpacity` tan solo se le agrego el icono, ademas de un estilo adicional, este es `flexDirection: 'row'`.
````
<TouchableOpacity 
  style={{
    ...styles.menuBoton,
    flexDirection: 'row'
  }}
  onPress={ () => navigation.navigate('Tabs') }
>
  <Icon name="albums-sharp" size={25}/>
  <Text style={ styles.menuTexto }>  Tabs</Text>
</TouchableOpacity>
````
De esta manera agregandole iconos a toda la aplicación.

----
# Context y Estado Global
En esta sección se verá todo relacionado a los estados de una aplicación, especialmente los globales, comunicación entre diferentes componentes, para esto se utilizará elementos propios de __React__ ademas de el tipado con __TypeScript__.


### 1.- Creación del Context con TypeScript
En este paso se creará el primer context.

Pasos a Seguir:
* Crear el primer context de la aplicación en `context/AthContext.tsx`
* Importarlo el context en `App.tsx` para su uso.

En `context/AthContext.tsx`
* Realizamos la importación de React y `createContext`.
````
import React, { createContext } from 'react';
````
* Se crea una __interface__ para indicar como sera el tipado del estado inicial.
````
export interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  favoriteIcon?: string;
}
````
* Creamos el estado inicial que utilizará en el context.
````
export const authInitialState: AuthState = {
  isLoggedIn: false,
  username: undefined,
  favoriteIcon: undefined,
}
````
* Se crea una __interface__ para definir el tipado del context.
````
export interface AuthContextProps {
    authState: AuthState;
    signIn: () => void;
}
````
* Se crea el context, el cual se le pasa la __interface__.
````
export const AuthContext = createContext({} as AuthContextProps );
````
* Se crea el componente proveedor de estado, recibiendo por parametro `{ children }`.
* Mandamos el estado inicial ademas de una función vacía por el momento.
````
export const AuthProvider = ({ children }: any ) => {

  return (
      <AuthContext.Provider value={{
          authState: authInitialState,
          signIn: () => {}
      }}>
          { children }
      </AuthContext.Provider>
  )
}
````
En `App.tsx`
* Creamos otro componente funcional llamado __AppState__ que tendra por parametro `{ children }`.
````
const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}
````
* Finalmente agregamos nuestro recién creado componente funcional, encerrando `<MenuLateral />` y dentro de `<NavigationContainer>` para respetar la documentación de __React Navigator__, de esta manera manejaremos un estado global en nuestra aplicación.
````
const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <MenuLateral />
      </AppState>
    </NavigationContainer>
  )
}
````
----
### 2.- Consumir el Context - AuthState
En este punto se consumirá el estado que se tiene en el context en un componente screen.

Pasos a Seguir:
* Agregar __useContext__ en el componente screen `screens/SettingScreen.tsx`.

En `screens/SettingScreen.tsx`
* Importamos el __useContext__.
* Importar el contexto de `AuthContext`.
````
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
...
````
* Establecemos el context y desestructuramos `authState`.
````
const { authState } = useContext( AuthContext );
````
* Se implementa en `<Text>` los elementos que se tienen en el context, para ser mostrado.
````
return (
  <View style={{
      ...styles.globalMargin,
      marginTop: insets.top + 20
  }}>
      <Text style={styles.title}>Settings Screen</Text>
      <Text>{ JSON.stringify( authState, null, 4 ) }</Text>
  </View>
)
````
----
