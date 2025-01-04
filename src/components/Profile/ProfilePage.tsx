import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { useParams } from "react-router-dom";
import { getRequest } from "../../utils/api";
import { MdModeEditOutline } from "react-icons/md";
import { putRequest, patchRequest } from "../../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EditAvatarForm from "../common/EditAvatarForm";
import ProfileEditForm from "../common/ProfileEditForm";

function ProfilePage() {
  const { id } = useParams<{ id?: string }>();
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState<User | null>(null);
  const [avatarEditMode, setAvatarEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id") || null;

  useEffect(() => {
    const fetchUser = async (id: string | undefined) => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getRequest(`auth/users/${id}`);
        setUserData(response.user);
        setEditedUserData(response.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser(id);
  }, [id]);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUserData((prevData) => ({
      ...prevData!,
      username: e.target.value,
    }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedUserData((prevData) => ({
      ...prevData!,
      bio: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedUserData) {
      return;
    }

    const userDataToSubmit: Record<string, string> = {
      username: editedUserData.username || "",
      bio: editedUserData.bio || "",
    };

    const editRequest = await putRequest("auth/update", userDataToSubmit);

    if (editRequest.bio) {
      setUserData(editedUserData);
    }
    setIsEditMode(!isEditMode);
  };

  const handleAvatarClick = () => {
    setAvatarEditMode((prev) => !prev);
  };

  const handleAvatarFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const userDataToSubmit = new FormData(form);

    try {
      const response = await patchRequest(
        "auth/update-avatar",
        userDataToSubmit
      );
      setUserData((prevData) => ({
        ...prevData!,
        avatarUrl: response.avatarUrl,
      }));
      setAvatarEditMode(false);
    } catch (err) {
      console.error("Error updating avatar:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-nord5 text-nord4">
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin w-20 h-20" />
      ) : userData ? (
        <div className="bg-nord7 p-6 shadow-lg w-full">
          <div className="flex flex-col items-center space-y-4">
            {id === userId && (
              <MdModeEditOutline
                aria-label="editMode"
                className="w-7 h-7 text-nord7 bg-nord4 rounded-lg  "
                role="button"
                onClick={handleEditClick}
              />
            )}
            {userData.avatarUrl && (
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={userData.avatarUrl}
                alt={userData.username}
                onClick={id === userId ? handleAvatarClick : undefined}
              />
            )}
            {avatarEditMode && (
              <EditAvatarForm handleAvatarFormSubmit={handleAvatarFormSubmit} />
            )}
            {isEditMode ? (
              <ProfileEditForm
                handleFormSubmit={handleFormSubmit}
                editedUserData={editedUserData}
                handleUsernameChange={handleUsernameChange}
                handleBioChange={handleBioChange}
              />
            ) : (
              <>
                <h1 className="text-2xl font-bold text-nord6">
                  {userData.username}
                </h1>
                <p className="text-center text-nord5">{userData.bio}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-nord5">Error loading user data.</p>
      )}
    </div>
  );
}

export default ProfilePage;
