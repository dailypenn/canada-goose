import moment from 'moment'

export const IMAGE_URL = (attachment_uuid, extension) =>
  `https://snworksceo.imgix.net/dpn/${attachment_uuid}.sized-1000x1000.${extension}?w=1000`


export const TIME_AGO = published_at => moment(published_at, "YYYY-MM-DD HH:mm:ss").fromNow()