export const initialState = {
  currentUser: null,
  usersCurrentLocation: '',
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
    default:
      return state;
  }
};

export default reducer;
