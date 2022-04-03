import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import { View, Text } from 'react-native';
import { styles, colores } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Tab1Screen = () => {

  const { top } = useSafeAreaInsets();

  useEffect(() => {
    console.log('Tab1Screen effect')
  
  }, [])
  

  return (
    <View style={{
       ...styles.globalMargin,
       marginTop: top + 10
       }}>
        <Text style={ styles.title }> Iconos </Text>

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

    </View>
  )
}
