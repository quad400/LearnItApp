// reducers.js
const initialState = {
  searchResults: [],
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};


