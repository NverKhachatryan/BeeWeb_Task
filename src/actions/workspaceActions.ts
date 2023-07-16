import { Dispatch } from "redux";
import userApi from "../api/userApi";
export const CREATE_WORKSPACE = "CREATE_WORKSPACE";
export const READ_WORKSPACES = "READ_WORKSPACES";
export const UPDATE_WORKSPACE = "UPDATE_WORKSPACE";
export const DELETE_WORKSPACE = "DELETE_WORKSPACE"; // path to your store file

const API_BASE_URL = "/workspace";

// Create
export async function createWorkspace(workspace: Object) {
    try {
      const request = await userApi.post(API_BASE_URL, workspace);
      return({
        type: CREATE_WORKSPACE,
        payload: request,
      });
    } catch (error) {
      console.log(error);
    }
}

// Read
export const readWorkspaces = () => {
  return async function (dispatch: Dispatch) {
    try {
      const response = await userApi.get(API_BASE_URL);
      dispatch({
        type: READ_WORKSPACES,
        payload: response,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Update
export function updateWorkspace(workspace: any) {
  return async function (dispatch: Dispatch) {
    try {
      const request = await userApi.put(
        `${API_BASE_URL}/${workspace._id}`,
        workspace
      );
      dispatch({
        type: UPDATE_WORKSPACE,
        payload: request, 
      });
    } catch (error) {
      console.error(error);
    }
  };
}

// Delete
export function deleteWorkspace(id: any) {
  return async function (dispatch: Dispatch) {
    try {
      await userApi.delete(`${API_BASE_URL}/${id}`);
      dispatch({
        type: DELETE_WORKSPACE,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
