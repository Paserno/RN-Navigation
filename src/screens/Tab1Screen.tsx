import React, { useEffect } from 'react'

import { View, Text } from 'react-native';
import { styles, colores } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableIcon } from '../components/TouchableIcon';

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

        <Text> {/*  ctrl + alt + ↓ */}
          <TouchableIcon iconName="airplane-outline" />
          <TouchableIcon iconName="airplane" />
          <TouchableIcon iconName="home" />
          <TouchableIcon iconName="home-outline" />
          <TouchableIcon iconName="chatbox-ellipses-outline" />
          <TouchableIcon iconName="chatbox-ellipses" />
          <TouchableIcon iconName="duplicate-outline" />
          <TouchableIcon iconName="heart-outline" />
          <TouchableIcon iconName="heart" />
          <TouchableIcon iconName="images-outline" />
          <TouchableIcon iconName="images" />
          <TouchableIcon iconName="mic" />

        </Text>

    </View>
  )
}
