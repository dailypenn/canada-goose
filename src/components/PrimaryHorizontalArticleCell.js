import React, { useContext } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_REGULAR,
  BODY_SERIF,
} from '../utils/fonts'
import { parseAbstract } from '../utils/helperFunctions'
import { ThemeContext } from "./ThemeProvider";

const createStyles = (theme) => StyleSheet.create({
  title: {
    color: theme.primaryTextColor,
    fontFamily: DISPLAY_SERIF_BOLD,
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    marginTop: 15,
  },
  abstract: {
    color: theme.secondaryTextColor,
    fontFamily: BODY_SERIF,
    flex: 100,
    fontSize: 14,
    paddingTop: 10,
  },
  byline: {
    color: theme.secondaryTextColor,
    fontFamily: GEOMETRIC_REGULAR,
    flex: 100,
    alignSelf: 'flex-start',
    fontSize: 11,
    marginTop: 10,
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
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)
  const parsedAbstract = parseAbstract(abstract)

  if (
    imageURL ===
      'https://snworksceo.imgix.net/dpn/null.sized-1000x1000.null?w=1000' ||
    imageURL === 'https://snworksceo.imgix.net/dpn/.sized-1000x1000.?w=1000'
  ) {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title} numberOfLines={5}>
            {title}
          </Text>
          <Text style={styles.abstract}>{parsedAbstract}</Text>
        </View>
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
