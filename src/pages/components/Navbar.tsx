/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type FC } from "react";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { userLogout } from "../../actions/userActions";

const ExampleNavbar: FC = function () {
  const userLogin = useSelector((state: any) => state.login.userInfo);
  const imgUrl ="https://images.unsplash.com/photo-1472552944129-b035e9ea3744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  const dispatch = useDispatch<Dispatch<any>>();

  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.removeItem("userInfo");
    console.log("User is logged out");
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("userInfo");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: parsedToken });
    }
  }, []);
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Workspace
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            {userLogin && (
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar alt="User settings" img={imgUrl} rounded={true} />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    {" "}
                    {userLogin && userLogin[0]}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {userLogin && userLogin[1]}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  {userLogin && (
                    <button
                      className="w-full rounded-md bg-indigo-600 px-6 py-2 text-center text-white"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  )}
                </Dropdown.Item>
                <Dropdown.Divider />
              </Dropdown>
            )}
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
