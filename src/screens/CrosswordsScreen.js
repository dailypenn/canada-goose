import React, { useContext } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native'
import WebView from 'react-native-webview'
import { LogoActivityIndicator, ThemeContext } from '../components'
import { DISPLAY_SERIF_BLACK } from '../utils/fonts'

const puzzleMeLink = "https://amuselabs.com/pmm/date-picker?set=8a2bcb9778a08d0fc217aee1409a9e05467c363641513e2996bea49d0aee3177"

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingTop: Platform.OS == 'android' ? 10 : 0,
  },
  webView: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    paddingBottom: 6,
    borderBottomWidth: 0.8,
    borderBottomColor: theme.borderColor
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: theme.primaryTextColor,
    fontFamily: DISPLAY_SERIF_BLACK,
    fontSize: 28,
    lineHeight: 40,
  },
})

export const CrosswordsScreen = () => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_inner}>
          <Text style={styles.title}>Crosswords</Text>
        </View>
      </View>
      <WebView
        style={styles.webView}
        source={{ url: puzzleMeLink }}
        renderLoading={() => <LogoActivityIndicator />}
        startInLoadingState={true}
      />
    </SafeAreaView>
  )
}
