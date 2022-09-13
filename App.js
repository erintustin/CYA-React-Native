import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/MainComponent.js';
import AppLoading from 'expo-app-loading';
import { useFonts, GochiHand_400Regular, Catamaran_400Regular } from '@expo-google-fonts/dev';





export default function App() {
  let [fontsLoaded] = useFonts({
    GochiHand_400Regular,
    Catamaran_400Regular,
  });

  if (!fontsLoaded) {
    return (
    <AppLoading />
    );
  } else {
    return (
    
    <NavigationContainer>
        <Provider store={store}>
          <Main />
        </Provider>
      </NavigationContainer>
    
  );
};
}