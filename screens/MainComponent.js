import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';

import DirectoryScreen from './DirectoryScreen';
import ResourceInfoScreen from './ResourceInfoScreen';

const ToolkitNavigator = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1ab4d2'
                },
                    headerTintColor: '#fff'
            }}
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
           <ToolkitNavigator />
        </View>
    );
};

export default Main;