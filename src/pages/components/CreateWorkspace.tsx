import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import { debounce } from "lodash";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface CreateWorkspaceProps {
  createWorkspace: (
    workspace: any
  ) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>; 
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

function CreateWorkspace({
  createWorkspace,
  showModal,
  setShowModal,
}: CreateWorkspaceProps) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      createWorkspace({ name: workspaceName, slug: workspaceSlug });
    } catch (error) {
      console.error("error: ", error);
    }
    closeModal();
    update();
  };
  const closeModal = () => {
    setShowModal(false);
  };
  function update() {
    window.location.reload();
  }

  const handleSlugCheck = debounce((slug) => {
    fetch(`http://localhost:5000/workspace/slug/${slug}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.available) {
          setSlugStatus("Slug is available");
          setIsButtonDisabled(false);
        } else {
          setSlugStatus(`Slug is taken, suggested: ${data.suggestion}`);
          setIsButtonDisabled(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, 500);

  const handleSlugChange = (event: any) => {
    setWorkspaceSlug(event.target.value);
    handleSlugCheck(event.target.value);
  };

  return (
    <CustomModal isOpen={showModal} size={"large"} onClose={closeModal}>
      <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Create a new project
        </h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="email"
              name="workspaceName"
              value={workspaceName}
              onChange={(event) => setWorkspaceName(event.target.value)}
              placeholder="Name"
              type="text"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Slug" />
            </div>
            <TextInput
              id="text"
              name="workspaceSlug"
              placeholder="Slug"
              type="text"
              value={workspaceSlug}
              onChange={handleSlugChange}
            />
          </div>
          <p className="mb-3">{slugStatus}</p>

          <Button
            type="submit"
            value="Create"
            disabled={isButtonDisabled}
            className="bg-indigo-700"
          >
            Create Workspace
          </Button>
        </form>
      </div>
    </CustomModal>
  );
}

export default CreateWorkspace;
