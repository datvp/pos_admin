import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const ArtistTypes = mirrorKeyValue([
  'ARTIST_UPDATE_STATE',
  'ARTIST_FETCH_AVAILABLE',
  'ARTIST_CONFIRM',
  'ARTIST_RESET_STATE',
  'RESET_STATE',
]);

const {
  ARTIST_UPDATE_STATE,
  ARTIST_FETCH_AVAILABLE,
  ARTIST_RESET_STATE,
  ARTIST_CONFIRM,
  RESET_STATE,
} = ArtistTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  listArtists: [], // list all artists
  searchArtists: [], // list artist by searching
  availableArtists: [], // artists by chosen services
  detailArtist: {}, // like artist profile, being chosen
  displayKey: 'listArtists',
  bookedDateTimes: [],
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case ARTIST_UPDATE_STATE:
      return { ...state, ...data };
    case ARTIST_FETCH_AVAILABLE:
      return { ...state, ...data };
    case ARTIST_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
