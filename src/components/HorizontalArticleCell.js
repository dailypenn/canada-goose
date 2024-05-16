import React, { useContext } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { DISPLAY_SERIF_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { ThemeContext } from "./ThemeProvider";

const createStyles = (theme) => StyleSheet.create({
  title: {
    color: theme.primaryTextColor,
    fontFamily: DISPLAY_SERIF_BOLD,
    flex: 1,
    fontSize: 18,
    lineHeight: 22,
  },
  byline: {
    color: theme.secondaryTextColor,
    fontFamily: GEOMETRIC_REGULAR,
    flex: 100,
    fontSize: 12,
    paddingTop: 10,
  },
  image: {
    width: 100,
    height: 75,
    padding: 15,
    borderRadius: 2,
    backgroundColor: theme.wallColor,
    alignSelf: 'flex-end',
  },
  imageView: {
    // Do not edit - is for positioning not shadow
    shadowColor: theme.primaryTextColor,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 5.49,
    //elevation: 9,
  },
  category: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    textTransform: 'uppercase',
    fontSize: 13,
    lineHeight: 13,
    paddingBottom: 4,
  },
  hView: {
    //backgroundColor: 'rgba(220, 220, 220, 1.0)',
    flexDirection: 'row',
    padding: 20,
  },
  vView: {
    paddingRight: 15,
    flex: 1,
    width: '80%',
  },
})

export const HorizontalArticleCell = ({
  imageURL,
  title,
  timeAgo,
  authors,
}) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  if (
    imageURL ===
      'https://snworksceo.imgix.net/dpn/null.sized-1000x1000.null?w=1000' ||
    imageURL === 'https://snworksceo.imgix.net/dpn/.sized-1000x1000.?w=1000'
  ) {
    return (
      <View>
        <View style={styles.hView}>
          <View style={styles.vView}>
            <Text style={styles.title} numberOfLines={5}>
              {title}
            </Text>
            <Text style={styles.byline}>
              By {authors} • {timeAgo}
            </Text>
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View>
        <View style={styles.hView}>
          <View style={styles.vView}>
            <Text style={styles.title} numberOfLines={5}>
              {title}
            </Text>
            <Text style={styles.byline}>
              By {authors} • {timeAgo}
            </Text>
          </View>
          <View style={styles.imageView}>
            <Image style={styles.image} source={{ uri: imageURL }} />
          </View>
        </View>
      </View>
    )
  }
}
