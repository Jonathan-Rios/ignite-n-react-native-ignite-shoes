import OneSignal from 'react-native-onesignal'

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Jonathan',
    'user_email': 'jonathan.riosousa@gmail.com'
  })
  // ? Para remover tags pelo dispositivo OneSignal.deleteTag('user_email')
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTags({
    'cart_items_count': itemsCount
  })
}