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
  }

  const IMGRenderer = (htmlAttribs, passProps, props) => {
    return (
      <InLineImage htmlAttribs={htmlAttribs} key={passProps.key}></InLineImage>
    )
  }

  const InLineImage = ({ htmlAttribs }) => {
    const [zoom] = useState(new Animated.Value(1.05))

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
            minHeight: 100,
            marginBottom: 15,
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
                  aspectRatio: () => {
                    const ratio =
                      htmlAttribs['data-width'] / htmlAttribs['data-height']
                    return ratio ? ratio : 1
                  },
                  borderRadius: 2,
                  backgroundColor: 'black',
                }}
              />
            }
          >
            <Animated.Image
              source={{ uri: htmlAttribs.src }}
              style={{
                flex: 1,
                resizeMode: 'center',
                borderRadius: 2,
                transform: [{ scale: zoom }],
                width: '100%',
                aspectRatio:
                  htmlAttribs['data-width'] / htmlAttribs['data-height'],
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
          onLinkPress={() => onLinkPress()}
          source={{
            html: article.content,
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
