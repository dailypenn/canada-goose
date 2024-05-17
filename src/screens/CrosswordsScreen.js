import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { LogoActivityIndicator, ThemeContext } from '../components';
import { DISPLAY_SERIF_BLACK } from '../utils/fonts';
import Ionicons from "react-native-vector-icons/Ionicons";

const puzzleMeLink = "https://amuselabs.com/pmm/date-picker?set=8a2bcb9778a08d0fc217aee1409a9e05467c363641513e2996bea49d0aee3177";

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingTop: Platform.OS == 'android' ? 10 : 0,
  },
  webView: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    marginTop: 0.5
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
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
});

export const CrosswordsScreen = () => {
  const theme = useContext(ThemeContext);
  const styles = createStyles(theme);
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_inner}>
          {canGoBack ? (
            <TouchableOpacity style={{ marginLeft: -4 }} onPress={handleBack}>
              <Ionicons
                name="chevron-back-outline"
                size={32}
                color={theme.primaryTextColor}
                style={{ marginLeft: -4 }}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.title}>Crosswords</Text>
          )}
        </View>
      </View>
      <WebView
        ref={webViewRef}
        style={styles.webView}
        source={{ url: puzzleMeLink }}
        renderLoading={() => <LogoActivityIndicator />}
        startInLoadingState={true}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};