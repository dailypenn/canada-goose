import AsyncStorage from '@react-native-async-storage/async-storage'

const HOME_FEED_ORDER_KEY = 'home feed order'
export const LAST_VIEWED_PUBLICATION_KEY = 'last viewed publication'

export const GET_HOME_FEED_ORDER_KEY = publication =>
  HOME_FEED_ORDER_KEY + publication

export const SAVED_ARTICLES_KEY = 'saved articles'

export const IS_ONBOARDED_KEY = 'onboarded'

export const NOTIF_PREFS_KEY = 'notif prefs'

export const DISPLAY_PREFS_KEY = 'display prefs'

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
      await AsyncStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      // setting error
      return false
    }
  },
  removeItem: async function (key) {
    try {
      await AsyncStorage.removeItem(key)
      return true
    } catch (e) {
      // removing error
      return false
    }
  },

  clearAll: async function () {
    await AsyncStorage.clear(error => {
      console.log('clearing error:', error ? error : 'none')
    })
  },
}
