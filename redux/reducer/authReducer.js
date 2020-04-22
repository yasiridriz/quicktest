const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
  case process.env.AUTHENTICATE:
    return { token: action.payload };
  case process.env.DEAUTHENTICATE:
    return { token: null };
  default:
    return state;
  }
};