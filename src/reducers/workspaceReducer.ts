import {
  CREATE_WORKSPACE,
  READ_WORKSPACES,
  UPDATE_WORKSPACE,
  DELETE_WORKSPACE,
} from "../actions/workspaceActions";

export interface Workspace {
  _id: string;
  userId: string;
  name: string;
  slug: string;
}

export interface WorkspaceAction {
  type: string;
  payload: {
    data: Workspace | Workspace[];
  };
}

export default function workspaceReducer(state = [], action: any) {
  switch (action.type) {
    case CREATE_WORKSPACE:
      return [...state, action.payload.data];
    case READ_WORKSPACES:
      return action.payload.data ? action.payload.data : state;
    case UPDATE_WORKSPACE:
      return state.map((workspace: Workspace) =>
        workspace._id === action.payload.data._id
          ? action.payload.data
          : workspace
      );
    case DELETE_WORKSPACE:
      return state.filter(
        (workspace: Workspace) => workspace._id !== action.payload
      );
    default:
      return state;
  }
}
