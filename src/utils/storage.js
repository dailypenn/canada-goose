import AsyncStorage from '@react-native-community/async-storage'

export const HOME_FEED_ORDER_KEY = 'home_feed_order'

export const Storage = {
  getItem: async function (key) {
    try {
      const item = await AsyncStorage.getItem(key)
      return item != null ? JSON.parse(item) : null
    } catch (e) {
      // getting error
    }
  },
  setItem: async function (key, value) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // setting error
    }
  },
  removeItem: async function (key) {
    try {
      return await AsyncStorage.removeItem(key)
    } catch (e) {
      // removing error
    }
  },
}
