import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";
import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
  Action,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import workspaceReducer from "./reducers/workspaceReducer";
import { Flowbite } from "flowbite-react";
import theme from "./flowbite-theme";

export type RootState = ReturnType<typeof reducer>;

const reducer = combineReducers({
  login: userLoginReducer,
  register: userRegisterReducer,
  workspaces: workspaceReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
let store = createStore(reducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Flowbite theme={{ theme }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Flowbite>
    </React.StrictMode>
  </Provider>
);
