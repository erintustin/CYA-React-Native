import { View, StyleSheet, Text, Image } from 'react-native';
import logo from '../assets/img/CYAlogo.png'
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, 
        DrawerContentScrollView, 
        DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import DirectoryScreen from './DirectoryScreen';
import ResourceInfoScreen from './ResourceInfoScreen';

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerStyle: {
        backgroundColor: '#1ab4d2',
    },
        headerTintColor: '#fff',
};

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    
    return(
        <Stack.Navigator
            screenOptions={screenOptions}>
                <Stack.Screen 
                    name='Home'
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        title: 'Home',
                        headerLeft: () => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress= {() => navigation.toggleDrawer()}
                            />
                        )
                    })}
                    />
        </Stack.Navigator>
    );
};

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={screenOptions}
        >
            <Stack.Screen 
                name='Directory'
                component={DirectoryScreen}
                options={({ navigation }) => ({
                    title: 'Resource Directory',
                    headerLeft: () => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress= {() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
            
            <Stack.Screen 
                name='ResourceInfo'
                component={ResourceInfoScreen}
                options={({route}) => ({
                    title: route.params.resource.name
                })}
            />
        </Stack.Navigator>
    );

};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>Congrats, You're Autistic!</Text>
            </View>
        </View>
        <DrawerItemList 
            {...props} 
            labelStyle={{ fontWeight: 'bold' }}
            activeBackgroundColor='#cfe6ea'
            activeTintColor='black' />
    </DrawerContentScrollView>
);

const Main = () => {

    return (
        <View style={{ 
                flex: 1, 
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
                }}>
           <Drawer.Navigator
            initialRouteName='Home'
            drawerStyle={{ backgroundColor: 'rgb(243, 239, 239)'}}
            drawerContent={CustomDrawerContent}
            >
                <Drawer.Screen 
                    name='Home'
                    component={HomeNavigator}
                    options={{ title: 'Home' }}
                />
                <Drawer.Screen 
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{ title: 'Resource Directory' }}
                />

           </Drawer.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    },

    drawerHeader: {
        backgroundColor: '#1ab4d2',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },

    drawerHeaderText: {
        color: '#000',
        fontSize: 26,
        fontFamily: 'GochiHand_400Regular',
        margin: 5
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    }
});

export default Main;