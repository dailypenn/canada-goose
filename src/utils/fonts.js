// Title of Category of Article

import * as Font from 'expo-font'

const FONT_FOLDER = '../static/fonts'

export const DISPLAY_SERIF_BOLD = 'PlayfairDisplayBold'
export const DISPLAY_SERIF_MEDIUM = 'PlayfairDisplayMedium'

export const GEOMETRIC_BOLD = 'PoppinsBold'
export const GEOMETRIC_REGULAR = 'PoppinsRegular'

export const BODY_SERIF = 'Libertinus'
export const BODY_SERIF_ITALIC = 'LibertinusItalic'

export async function loadFonts() {
  Font.loadAsync({
    Libertinus: require(`${FONT_FOLDER}/Libertinus/LibertinusSerif-Regular.otf`),
    LibertinusItalic: require(`${FONT_FOLDER}/Libertinus/LibertinusSerif-Italic.otf`),
    PlayfairDisplayBold: require(`${FONT_FOLDER}/PlayfairDisplay/PlayfairDisplay-Bold.ttf`),
    PlayfairDisplayMedium: require(`${FONT_FOLDER}/PlayfairDisplay/PlayfairDisplay-Medium.ttf`),
    PoppinsBold: require(`${FONT_FOLDER}/Poppins/Poppins-Bold.ttf`),
    PoppinsRegular: require(`${FONT_FOLDER}/Poppins/Poppins-Regular.ttf`),
  })
}
