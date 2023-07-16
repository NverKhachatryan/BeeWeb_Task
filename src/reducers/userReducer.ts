
export const userRegisterReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const storedToken = localStorage.getItem('userInfo');
const initialState = {
  loading: false,
  userInfo: storedToken && storedToken,
  error: null,
};
console.log(initialState)

export const userLoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};
