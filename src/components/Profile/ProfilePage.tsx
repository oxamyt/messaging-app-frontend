import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { useParams } from "react-router-dom";
import { getRequest } from "../../utils/api";

function ProfilePage() {
  const { id } = useParams<{ id?: string }>();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async (id: string | undefined) => {
      if (!id) return;

      try {
        const response = await getRequest(`auth/users/${id}`);

        setUserData(response.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser(id);
  }, [id]);

  return (
    <div className="flex justify-center items-center h-full bg-nord5 text-nord4">
      {userData ? (
        <div className="bg-nord2 p-6  shadow-lg  w-full">
          <div className="flex flex-col items-center space-y-4">
            {userData.avatarUrl && (
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={userData.avatarUrl}
                alt={userData.username}
              />
            )}
            <h1 className="text-2xl font-bold text-nord6">
              {userData.username}
            </h1>
            <p className="text-center text-nord5">{userData.bio}</p>
          </div>
        </div>
      ) : (
        <p className="text-nord5">Loading user data...</p>
      )}
    </div>
  );
}

export default ProfilePage;
