/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as workspaceActions from "../actions/workspaceActions";
import CreateWorkspace from "./components/CreateWorkspace";
import { Dispatch } from "redux";
import CardProject from "./components/CardProject";

const Workspaces: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleTabClick = () => {
    setShowModal(true);
  };

  const workspaces = useSelector((state: any) => state.workspaces);
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    dispatch(workspaceActions.readWorkspaces());
  }, [dispatch]);
  const createWorkspace = (workspace: Object) =>
    dispatch(workspaceActions.createWorkspace(workspace));

  const updateWorkspace = (workspace: Object) =>
    dispatch(workspaceActions.updateWorkspace(workspace));

  const deleteWorkspace = (id: string) =>
    dispatch(workspaceActions.deleteWorkspace(id));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="m-1 inline-block">
          <a
            onClick={handleTabClick}
            className="max-w-sm h-96 ml-2 dark:hover:border-indigo-600  hover:border-solid hover:bg-slate-50 dark:hover:bg-gray-700 dark:text-white hover:text-indigo-600  group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-white-900 font-medium py-3"
          >
            <svg
              className="group-hover:text-indigo-600  mb-1 text-slate-400"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            New project
          </a>
          {showModal && (
            <CreateWorkspace
              createWorkspace={createWorkspace as any}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          )}
        </div>
        {workspaces &&
          workspaces.length > 0 &&
          workspaces.map((workspace: any) => {
            if (!workspace) {
              return null; // Or return some default component for missing workspace
            }

            return (
              <div key={workspace._id}>
                <CardProject
                  index={workspace._id}
                  imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
                  editData={updateWorkspace}
                  deleteData={deleteWorkspace}
                  slugName={workspace.slug}
                  title={workspace.name}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Workspaces;
