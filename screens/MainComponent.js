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
import myToolkitScreen from './MyToolkitScreen';
import LoginScreen from './LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchResources } from '../features/resources/resourcesSlice';
import { fetchNotes } from '../features/notes/notesSlice';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

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
                    title: route.params.resource.name,
                    gesturesEnabled: true
                })}
            />
        </Stack.Navigator>
    );
};

const MyToolkitNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='MyToolkit'
                component={myToolkitScreen}
                options={({ navigation }) => ({
                    title: 'My Toolkit',
                    headerLeft: () => (
                        <Icon
                            name='user'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator> 
    );
};

const LoginNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={({ navigation, route }) => ({
                    headerTitle: getFocusedRouteNameFromRoute(route),
                    headerLeft: () => (
                        <Icon
                            name={
                                getFocusedRouteNameFromRoute(route) === 'Register'
                                    ? 'user-plus'
                                    : 'sign-in'
                            }
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchResources());
        dispatch(fetchNotes());
    }, [dispatch]);

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
                    name='Login'
                    component={LoginNavigator}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen 
                    name='Home'
                    component={HomeNavigator}
                    options={{ 
                        title: 'Home',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen 
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{ 
                        title: 'Resource Directory',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='list'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color} 
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='MyToolkit'
                    component={MyToolkitNavigator}
                    options={{
                        title: 'My Toolkit',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='user'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
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