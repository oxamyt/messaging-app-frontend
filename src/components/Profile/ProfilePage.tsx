import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { useParams } from "react-router-dom";
import { getRequest } from "../../utils/api";
import { MdModeEditOutline } from "react-icons/md";
import InputField from "../common/InputField";
import { putRequest } from "../../utils/api";

function ProfilePage() {
  const { id } = useParams<{ id?: string }>();
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async (id: string | undefined) => {
      if (!id) return;

      try {
        const response = await getRequest(`auth/users/${id}`);
        setUserData(response.user);
        setEditedUserData(response.user);
      } catch (err) {
        console.error(err);
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

  return (
    <div className="flex justify-center items-center h-full bg-nord5 text-nord4">
      {userData ? (
        <div className="bg-nord7 p-6 shadow-lg w-full">
          <div className="flex flex-col items-center space-y-4">
            <MdModeEditOutline
              aria-label="editMode"
              className="w-7 h-7"
              role="button"
              onClick={handleEditClick}
            />
            {userData.avatarUrl && (
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={userData.avatarUrl}
                alt={userData.username}
              />
            )}
            {isEditMode ? (
              <form
                onSubmit={handleFormSubmit}
                className="w-full max-w-md bg-nord4 p-6 rounded-lg shadow-lg space-y-4"
              >
                <InputField
                  label="Username"
                  name="username"
                  type="text"
                  value={editedUserData?.username || ""}
                  handleChange={handleUsernameChange}
                  minLength={2}
                  maxLength={16}
                />
                <label className="block text-nord3">
                  Bio:
                  <textarea
                    name="bio"
                    value={editedUserData?.bio || ""}
                    onChange={handleBioChange}
                    minLength={2}
                    maxLength={10}
                    required
                    className="w-full p-3 mt-2 rounded-md bg-nord2 text-nord6"
                  />
                </label>
                <button className="w-full py-3 mt-4 bg-nord8 text-nord3 font-bold rounded-md">
                  Submit
                </button>
              </form>
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
        <p className="text-nord5">Loading user data...</p>
      )}
    </div>
  );
}

export default ProfilePage;
