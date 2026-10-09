import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import {
  CormorantGaramond_400Regular_Italic,
} from '@expo-google-fonts/cormorant-garamond';
import { Caveat_400Regular, Caveat_700Bold } from '@expo-google-fonts/caveat';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { PHOTOS } from './content/photos';
import { BookFlipper } from './book/BookFlipper';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Cinzel_700Bold,
    CormorantGaramond_400Regular_Italic,
    Caveat_400Regular,
    Caveat_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    Asset.loadAsync(Object.values(PHOTOS))
      .catch(() => {})
      .finally(() => setAssetsReady(true));
  }, []);

  // Se as fontes falharem, libera a splash mesmo assim (fonte do sistema).
  const ready = (fontsLoaded || !!fontError) && assetsReady;

  const onLayout = useCallback(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayout}>
      <SafeAreaProvider>
        <BookFlipper />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
