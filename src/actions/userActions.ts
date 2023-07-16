import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import userApi from "../api/userApi";

type DataType = {
  fullName: string;
  email: string;
  password: string;
};
type UserAction = ThunkAction<
  void,
  any,
  unknown,
  { type: string; payload?: any }
>;

export const registerUser =
  (data: DataType): UserAction =>
  async (dispatch: Dispatch) => {
    try {
      const response = await userApi.post("/user/signup", data);
      dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch({ type: "USER_REGISTER_FAIL", payload: error.message });
      }
    }
  };
export const loginUser =
  (email: string, password: string): UserAction =>
  async (dispatch: Dispatch) => {
    try {
      const response = await userApi.post("/user/login", { email, password });
      const userLogin = response.data; // Assuming the API response has a "userLogin" property

      // Update userLogin variable or perform other actions based on its value
      if (userLogin) {
        // User is logged in, perform specific actions
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: response.data, // Assuming response.data contains the user login information
        });
        console.log("User is logged in");
        localStorage.setItem(
          "userInfo",
          JSON.stringify([userLogin.fullName, userLogin.email])
        );
      } else {
        // User login is empty or falsy, perform alternative actions
        console.log("User is not logged in");
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "USER_LOGIN_FAIL", payload: error.message });
      }
    }
  };

export const userLogout = () => {
  return {
    type: "USER_LOGOUT",
  };
};
