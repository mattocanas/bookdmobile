export const initialState = {
  currentUser: null,
  usersCurrentLocation: '',
  usersCurrentBrainstorm: null,
  currentUserPictureURI: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case 'SET_USERSCURRENTLOCATION':
      return {
        ...state,
        usersCurrentLocation: action.usersCurrentLocation,
      };
    case 'SET_USERSCURRENTBRAINSTORM':
      return {
        ...state,
        usersCurrentBrainstorm: action.usersCurrentBrainstorm,
      };
    case 'SET_CURRENTUSERPICTUREURI':
      return {
        ...state,
        currentUserPictureURI: action.currentUserPictureURI,
      };
    default:
      return state;
  }
};

export default reducer;
