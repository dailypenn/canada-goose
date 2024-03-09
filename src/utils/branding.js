/* Publication Specific Colors */

import { PublicationEnum } from './constants'

export const DP_LOGO_RED_URI = 'src/static/logos/dp-logo-small-red.png'
export const DP_LOGO_WHITE_URI = 'src/static/logos/dp-logo-small-white.png'

export const STREET_LOGO_TEAL_URI =
  'src/static/logos/street-logo-small-teal.png'
export const STREET_LOGO_WHITE_URI =
  'src/static/logos/street-logo-small-white.png'

export const UTB_LOGO_BLUE = 'src/static/logos/utb-logo-small-blue.png'
export const UTB_LOGO_WHITE = 'src/static/logos/utb-logo-small-white.png'

export const DP_RED = '#D72E25' //'#A61E21'
export const UTB_BLUE = '#3964A6'
export const STREET_TURQ = '#25B7B6'

export const DP_RED_RGBA = 'rgba(215, 46, 37)' //'rgba(166, 30, 33)'
export const UTB_BLUE_RGBA = 'rgba(57, 100, 166)'
export const STREET_TURQ_RGBA = 'rgba(37, 183, 182)'

export const PublicationPrimaryColor = pub => {
  switch (pub) {
    case PublicationEnum.dp:
      return DP_RED
    case PublicationEnum.street:
      return STREET_TURQ
    case PublicationEnum.utb:
      return UTB_BLUE
    default:
      return Error('Enum not recognized')
  }
}

export const PublicationPrimaryColorRgba = pub => {
  switch (pub) {
    case PublicationEnum.dp:
      return DP_RED_RGBA
    case PublicationEnum.street:
      return STREET_TURQ_RGBA
    default:
      return UTB_BLUE_RGBA
  }
}

export const PublicationLargeLogo = pub => {
  // TODO: Get all logos
  switch (pub) {
    case PublicationEnum.dp:
      return DP_LOGO_LARGE
    case PublicationEnum.street:
      return STREET_LOGO_LARGE
    default:
      return UTB_LOGO_LARGE
  }
}
