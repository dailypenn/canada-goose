import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Animated, Easing } from 'react-native'
import ImageView from 'react-native-image-viewing'
import HTML from 'react-native-render-html'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  BODY_SERIF,
  BODY_SERIF_BOLD,
  BODY_SERIF_ITALIC,
  GEOMETRIC_BOLD,
  GEOMETRIC_REGULAR,
} from '../utils/fonts'
import {
  IMAGE_URL,
  getArticlePubSlug,
  isValidURL,
  PREFIXED_AUTHORS,
} from '../utils/helperFunctions'
import { PublicationPrimaryColor } from '../utils/branding'
import MaskedView from '@react-native-community/masked-view'
import WebView from 'react-native-webview'

export const CustomHTML = ({ article, currPublication, onLinkPress }) => {
  const [modalVisible, isModalVisible] = useState(false)
  const [imgURI, updateimgURI] = useState(null)

  const tagStyles = {
    p: {
      fontSize: 18,
      lineHeight: 28,
      marginBottom: 20,
      fontFamily: BODY_SERIF,
    },
    a: {
      fontSize: 18,
    },
    i: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: BODY_SERIF_ITALIC,
    },
    b: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: BODY_SERIF_BOLD,
    },
    strong: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: GEOMETRIC_BOLD,
      color: PublicationPrimaryColor(currPublication),
    },
    em: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: GEOMETRIC_BOLD,
      color: PublicationPrimaryColor(currPublication),
    },
    small: {
      fontSize: 12,
      lineHeight: 20,
      fontFamily: BODY_SERIF,
    },
  }

  const IMGRenderer = (htmlAttribs, passProps, props) => {
    return (
      <InLineImage htmlAttribs={htmlAttribs} key={passProps.key}></InLineImage>
    )
  }

  const InLineImage = ({ htmlAttribs }) => {
    const [zoom] = useState(new Animated.Value(1.05))
    const [ASPECT_RATIO, SET_ASPECT_RATIO] = useState(htmlAttribs['data-width'] / htmlAttribs['data-height']) 

    if (htmlAttribs['data-width'] == 0 | htmlAttribs['data-height'] == 0) {
      Image.getSize(htmlAttribs['src'], (width, height) => {
        SET_ASPECT_RATIO(width / height)
      });
    }

    const onPressIn = () => {
      Animated.timing(zoom, {
        toValue: 1.0,
        useNativeDriver: false,
        duration: 400,
        easing: Easing.out(Easing.exp),
      }).start()
    }

    const onPressOut = () => {
      Animated.timing(zoom, {
        toValue: 1.05,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.exp),
      }).start()
    }
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            updateimgURI(htmlAttribs.src)
            isModalVisible(true)
          }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={{
            width: '100%',
            marginBottom: 10,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          activeOpacity={1}
        >
          <MaskedView
            maskElement={
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#DDD',
                  resizeMode: 'center',
                  borderRadius: 2,
                  backgroundColor: 'black',
                  width: '100%',
                }}
              />
            }
          >
            <Animated.Image
              source={{ uri: htmlAttribs.src }}
              style={{
                flex: 1,
                resizeMode: 'cover',
                borderRadius: 2,
                transform: [{ scale: zoom }],
                width: '100%',
                aspectRatio: ASPECT_RATIO ? ASPECT_RATIO : null,
                backgroundColor: '#EEE',
              }}
            />
          </MaskedView>

          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              position: 'absolute',
              bottom: 10,
              right: 10,
              padding: 4,
              borderRadius: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <Ionicons name="expand-outline" size={16} color={'#666'} />
          </View>
        </TouchableOpacity>
      </>
    )
  }

  const parseProjectPage = articleContent => {
    if (article.content.includes('document.location=')) {
      const urls = article.content.match(/\bhttps?:\/\/\S+/gi)
      if (urls.length > 0) {
        return "<p>Check out this special project <a href=\"" + urls[0].replace(/'$/, '').replace(/"$/, '').trim() + "\" target=\"_blank\">here</a>!</p>"
      }
    }
    return articleContent
  }

  return (
    <>
      <ImageView
        visible={modalVisible}
        onRequestClose={() => isModalVisible(false)}
        imageIndex={0}
        images={[{ uri: imgURI }]}
        swipeToCloseEnabled={true}
      />
      <View style={{ padding: 20 }}>
        <HTML
          onLinkPress={onLinkPress}
          source={{
            html: parseProjectPage(article.content),
          }}
          tagsStyles={tagStyles}
          allowWhitespaceNodes={false}
          renderers={{
            img: IMGRenderer,
          }}
        />
      </View>
    </>
  )
}
