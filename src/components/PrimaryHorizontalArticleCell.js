import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_REGULAR,
  BODY_SERIF,
} from '../utils/fonts'
import { parseAbstract } from '../utils/helperFunctions'

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontFamily: DISPLAY_SERIF_BOLD,
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    marginTop: 15,
  },
  abstract: {
    color: '#888',
    fontFamily: BODY_SERIF,
    flex: 100,
    fontSize: 14,
    paddingTop: 10,
  },
  byline: {
    color: '#888',
    fontFamily: GEOMETRIC_REGULAR,
    flex: 100,
    alignSelf: 'flex-start',
    fontSize: 11,
    marginTop: 10,
    //textTransform: 'uppercase',
    textAlign: 'right',
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 2,
    aspectRatio: 1.6,
  },
  container: {
    padding: 20,
    flex: 1,
  },
})

export const PrimaryHorizontalArticleCell = ({
  imageURL,
  title,
  abstract,
  authors,
  timeAgo,
}) => {
  const parsedAbstract = parseAbstract(abstract)

  if (
    imageURL ==
      'https://snworksceo.imgix.net/dpn/null.sized-1000x1000.null?w=1000' ||
    imageURL == 'https://snworksceo.imgix.net/dpn/.sized-1000x1000.?w=1000'
  ) {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title} numberOfLines={5}>
            {title}
          </Text>
          <Text style={styles.abstract}>{parsedAbstract}</Text>
        </View>
        <View
          style={{
            borderBottomColor: '#CCC',
            borderBottomWidth: 1,
            marginHorizontal: 20,
          }}
        />
      </View>
    )
  } else {
    return (
      <View>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: imageURL }} />

          <Text style={styles.title} numberOfLines={5}>
            {title}
          </Text>
          <Text style={styles.abstract}>{parsedAbstract}</Text>
          <Text style={styles.byline}>
            By {authors} • {timeAgo}
          </Text>
        </View>
      </View>
    )
  }
}
