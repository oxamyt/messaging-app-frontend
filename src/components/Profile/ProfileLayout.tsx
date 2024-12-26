import Header from "../common/Header";

import ProfilePage from "./ProfilePage";

function ProfileLayout() {
  return (
    <div className="h-screen flex relative flex-col bg-nord6 text-nord0">
      <Header />
      <div className="flex-1 relative">
        <ProfilePage />
      </div>
    </div>
  );
}

export default ProfileLayout;
