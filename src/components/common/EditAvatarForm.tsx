function EditAvatarForm({
  handleAvatarFormSubmit,
}: {
  handleAvatarFormSubmit: (e: React.FormEvent) => Promise<void>;
}) {
  return (
    <form
      className="flex
        flex-col
        justify-center"
      onSubmit={handleAvatarFormSubmit}
      encType="multipart/form-data"
    >
      <input type="file" name="avatar" required />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
      >
        Upload Avatar
      </button>
    </form>
  );
}

export default EditAvatarForm;
