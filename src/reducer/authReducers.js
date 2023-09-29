  // updated SignInReducer function
export const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SIGN_IN':
      return {
        ...state,
        userToken: action.payload.userToken
      };
    case 'SIGN_IN_GOOGLE':
      return {
        ...state,
        userToken: action.payload.userToken
      };
    case 'UPDATE_SIGN_UP':
      return {
        ...state,
        userToken: action.payload.userToken
      };
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          isSignIn: true, // Set isSignIn to true
        };
      case 'SIGN_UP':
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          isSignIn: true, // Set isSignIn to true
        };
      case 'SIGN_OUT':
        return {
          ...state,
          user: null,
          isLoading: false,
          isSignIn: false, // Set isSignIn to false
        };
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.payload,
        };
    default:
      return state;
  }
}

