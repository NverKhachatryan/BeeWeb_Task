/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export interface RootState {
  login: {
    loading: boolean;
    error: string;
    userInfo: Object;
  };
}

const SignInPage: FC = function (props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const localDispatch = useDispatch();

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = localDispatch;

  const userLogin = useSelector((state: RootState) => state.login) || {};
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [props.history, userInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Workspace
        </span>
      </div>
      <Card
        horizontal
        imgAlt=""
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto bg-primary-700">
              Login to your account
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <a href="/register" className="text-primary-600 dark:text-primary-300">
              Create account
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
