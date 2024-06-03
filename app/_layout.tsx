import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  LibreBaskerville_400Regular,
  LibreBaskerville_400Regular_Italic,
  LibreBaskerville_700Bold,
} from '@expo-google-fonts/libre-baskerville';
import HomeScreen from './index';
import AutumnScreen from './autumn';
import EditorialScreen from './editorial';
import GoModeScreen from './goMode';
import OnwardScreen from './onward';
import DreamScreen from './dream';
import LostScreen from './lost'
import StayModeScreen from './stayMode';
import HamletScreen from './hamlet';
import GoModeEditorialScreen from './goModeEditorial'
import HonkScreen from './honk'
import ShowmanScreen from './showman'
import GoModeOnwardScreen from './goModeOnward'
import GoModeShowmanScreen from './goModeShowman'
import GoModeHonkScreen from './goModeHonk'
import GoModeLostScreen from './goModeLost'
import GoModeDreamScreen from './goModeDream'
import GoModeAutumnScreen from './goModeAutumn'
import GoModeHamletScreen from './goModeHamlet';
import ImmortalScreen from './immortal'
import Question1Screen from './questions1'
import Question2Screen from './questions2'
import Question3Screen from './questions3'
import FinalDemoScreen from './finalDemo'

const Stack = createNativeStackNavigator();


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Baskerville: LibreBaskerville_400Regular,
    BaskervilleItalics: LibreBaskerville_400Regular_Italic,
    Bodoni: require('../assets/fonts/BodoniSvtyTwoSCITCTT-Book.woff.otf'),
    ...FontAwesome.font,
    Caslon: require('../assets/fonts/ACaslonPro-Regular.otf'),
    Bauhaus: require('../assets/fonts/BauhausRegular.ttf'),
    Reross: require('../assets/fonts/fonnts.com-Reross_Quadratic.otf')
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
//   <Stack>
//   {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
//   {/* <Stack.Screen name="story"/> */}
//   <Stack.Screen name="story"/>
// </Stack>
  return (
    <ThemeProvider value= {DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="index" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="stayMode" component={StayModeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="hamlet" component={HamletScreen} options={{headerShown: false}}/>
        <Stack.Screen name="editorial" component={EditorialScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="goMode" component={GoModeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="goModeEditorial" component={GoModeEditorialScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="dream" component={DreamScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="autumn" component={AutumnScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="onward" component={OnwardScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="lost" component={LostScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="honk" component={HonkScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="showman" component={ShowmanScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="goModeOnward" component={GoModeOnwardScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="goModeHonk" component={GoModeHonkScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="goModeShowman" component={GoModeShowmanScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="goModeAutumn" component={GoModeAutumnScreen} options={{headerShown: false}}/>
        <Stack.Screen name="goModeLost" component={GoModeLostScreen} options={{headerShown: false}}/>
        <Stack.Screen name="goModeDream" component={GoModeDreamScreen} options={{headerShown: false}}/>
        <Stack.Screen name="goModeHamlet" component={GoModeHamletScreen} options={{headerShown: false}}/>
        <Stack.Screen name="immortal" component={ImmortalScreen} options={{headerShown: false}}/>
        <Stack.Screen name="questions1" component={Question1Screen} options={{headerShown: false}}/>
        <Stack.Screen name="questions2" component={Question2Screen} options={{headerShown: false}}/>
        <Stack.Screen name="questions3" component={Question3Screen} options={{headerShown: false}}/>
        <Stack.Screen name="finalDemo" component={FinalDemoScreen} options={{headerShown: false}}/>

      </Stack.Navigator>
    </ThemeProvider>
  );
}
