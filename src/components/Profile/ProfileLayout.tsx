import Header from "../common/Header";
import Footer from "../common/Footer";
import ProfilePage from "./ProfilePage";

function ProfileLayout() {
  return (
    <div className="h-screen flex relative flex-col bg-nord6 text-nord0">
      <Header />
      <div className="flex-1 relative">
        <ProfilePage />
      </div>
      <Footer />
    </div>
  );
}

export default ProfileLayout;
