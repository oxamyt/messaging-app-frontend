function ImageForm({
  setImageForm,
  handleImageFormSubmit,
}: {
  setImageForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageFormSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="fixed   inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form
          className="flex flex-col items-center"
          onSubmit={handleImageFormSubmit}
          encType="multipart/form-data"
        >
          <input type="file" name="image" required className="mb-4" />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-nord14 text-white py-2 px-4 rounded"
            >
              Upload Image
            </button>
            <button
              type="button"
              onClick={() => setImageForm(false)}
              className="bg-nord12 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImageForm;
