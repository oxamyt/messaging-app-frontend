import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { useParams } from "react-router-dom";
import { getRequest } from "../../utils/api";

function ProfilePage() {
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async (userId: string | undefined) => {
      if (!userId) return;

      try {
        const response = await getRequest("auth/get-User", {
          userId,
        });
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser(userId);
  }, [userId]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>{userData.username}</h1>
          <p>{userData.bio}</p>
          {userData.avatarUrl && (
            <img src={userData.avatarUrl} alt={userData.username} />
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ProfilePage;
