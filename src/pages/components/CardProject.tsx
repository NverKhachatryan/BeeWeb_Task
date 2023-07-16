/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import CustomModal from "./CustomModal";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

type Props = {
  imgSrc: string;
  index: string;
  title: string;
  slugName: string;
  editData: (
    workspace: any
  ) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>; 
  deleteData: (
    id: string
  ) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
};

function CardProject({
  imgSrc,
  title,
  index,
  slugName,
  editData,
  deleteData,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(title);
  const [workspaceSlug, setWorkspaceSlug] = useState(slugName);
  const dropdownRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  function update() {
    window.location.reload();
  }
  
  const editDataHandler = () => {
    try {
      editData({
        _id: index,
        name: workspaceName,
        slug: workspaceSlug,
      });
      onClose();
      update()
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const deleteDataHandler = () => {
    try {
      deleteData(index);
    } catch (error) {
      console.error("error: ", error);
    }
  };
  const [show, setShow] = React.useState(false);

  const onOpen = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <div className="max-w-sm m-2 max-h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start justify-end relative">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          onClick={toggleDropdown}
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none  rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
        <div
          id="dropdown"
          ref={dropdownRef}
          className={`absolute top-full z-10 ${
            dropdownOpen ? "" : "hidden"
          } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a
                onClick={onOpen}
                type="submit"
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                onClick={deleteDataHandler}
                href={""}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>

      <img className="object-cover h-52 w-full" src={imgSrc} alt="" />
      <div className="p-5 h-64">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {slugName}
        </p>
      </div>
      <CustomModal isOpen={show} size={"large"} onClose={onClose}>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create a new project
          </h3>
          <form className="flex flex-col gap-4" onSubmit={editDataHandler}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="text12"
                type="text"
                defaultValue={workspaceName}
                onBlur={(e) => setWorkspaceName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Slug" />
              </div>
              <TextInput
                id="text1"
                defaultValue={workspaceSlug}
                onBlur={(e) => setWorkspaceSlug(e.target.value)}
              />
            </div>

            <Button type="submit" value="Create" className="bg-indigo-700">
              Update Workspace
            </Button>
          </form>
        </div>
      </CustomModal>
    </div>
  );
}

export default CardProject;
