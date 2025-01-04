import InputField from "./InputField";
import { User } from "../../types/types";

function ProfileEditForm({
  handleFormSubmit,
  editedUserData,
  handleUsernameChange,
  handleBioChange,
}: {
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
  editedUserData: User | null;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
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
          maxLength={50}
          className="w-full p-3 mt-2 rounded-md bg-nord2 text-nord6"
        />
      </label>
      <button className="w-full py-3 mt-4 bg-nord8 text-nord3 font-bold rounded-md">
        Submit
      </button>
    </form>
  );
}

export default ProfileEditForm;
