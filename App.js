import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/MainComponent.js';
import AppLoading from 'expo-app-loading';
import { useFonts, GochiHand_400Regular, Catamaran_400Regular } from '@expo-google-fonts/dev';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/LoadingComponent';



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
    
      <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <NavigationContainer>
                    <Main />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    
  );
};
}