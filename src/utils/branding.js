/* Publication Specific Colors */
import { PublicationEnum } from '../../NavigationController'

// const DP_LOGO_LARGE = "/src/static/logos/dp-logo-large.png";
// const UTB_LOGO_LARGE = "/src/static/logos/utb-logo-large.png";
// const STREET_LOGO_LARGE = "/src/static/logos/street-logo-large.png";

const DP_RED = '#A61E21'//'#D72E25'
const UTB_BLUE = '#3964A6'
const STREET_TURQ = '#25B7B6'

const DP_RED_RGBA = 'rgba(166, 30, 33)'//'rgba(215, 46, 37)'
const UTB_BLUE_RGBA = 'rgba(57, 100, 166)'
const STREET_TURQ_RGBA = 'rgba(37, 183, 182)'

const PublicationPrimaryColor = (pub) => {
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

const PublicationPrimaryColorRgba = (pub) => {
  switch (pub) {
    case PublicationEnum.dp:
      return DP_RED_RGBA
    case PublicationEnum.street:
      return STREET_TURQ_RGBA
    default:
      return UTB_BLUE_RGBA
  }
}

const PublicationLargeLogo = (pub) => {
  // TODO: Get all logos
  switch (pub) {
    case PublicationEnum.dp:
      return DP_LOGO_LARGE
    case Publication.street:
      return STREET_LOGO_LARGE
    default:
      return UTB_LOGO_LARGE
  }
}

export {
  PublicationPrimaryColor,
  PublicationPrimaryColorRgba,
  PublicationLargeLogo,
}
