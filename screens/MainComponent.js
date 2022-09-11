import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
                    options={{ title: 'Home' }}
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
                options={{ title: 'Resource Directory' }}
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

const Main = () => {

    return (
        <View style={{ 
                flex: 1, 
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
                }}>
           <Drawer.Navigator
            initialRouteName='Home'
            drawerStyle={{ backgroundColor: 'rgb(243, 239, 239)'}}>
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

export default Main;