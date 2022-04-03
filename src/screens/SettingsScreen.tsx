import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../theme/appTheme';
import { DrawerScreenProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends DrawerScreenProps<any, any> { };

export const SettingsScreen = ({ navigation }: Props) => {

    const insets = useSafeAreaInsets();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle:'Ajustes',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Icon name="menu" size={35} color="black" />
                </TouchableOpacity>
            )
        })
    }, [])

    return (
        <View style={{
            ...styles.globalMargin,
            marginTop: insets.top + 20
        }}>
            <Text style={styles.title}>Settings Screen</Text>
        </View>
    )
}
