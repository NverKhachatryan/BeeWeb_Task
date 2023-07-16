import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import WorkspaceScreen from "./pages/WorkspaceScreen";
import ErrorPage from "./pages/ErrorPage";
import { useSelector } from "react-redux";

interface LoginState {
  userInfo: UserInfo | null;
}
interface UserInfo {
    loading: boolean,
    userInfo: string,
    error: null | string,
}
function Main() {
  const userLogin = useSelector((state: { login: LoginState }) => state.login.userInfo);

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        {userLogin ? (
          <Route path="/login" element={<Navigate to="/" />} />
        ) : (
          <Route path="/login" element={<LoginScreen />} />
        )}
        {userLogin ? (
          <Route path="/" element={<WorkspaceScreen />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default Main;
