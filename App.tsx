import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';

OneSignal.setAppId('e0203e69-dc5d-4d2b-867f-fe27b6969b62');

OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    // ?  Exemplo deixado como comentário para tratar ações de botões do push notification
    const unsubscribe = OneSignal.setNotificationOpenedHandler(response => {
      const { actionId } = response.action as any;

      switch (actionId) {
        case '1':
          console.log('Ação 1 (Ver todas)');
          break;
        case '2':
          console.log('Ação 2 (Ver perdido)');
          break;
        default:
          console.log('Não foi clicado em botão de ação');
          break;
      }
    });

    // ? utilizado para remover o listener quando o componente for desmontado
    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
