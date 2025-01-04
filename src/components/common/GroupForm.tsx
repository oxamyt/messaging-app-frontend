interface GroupFormProps {
  submitGroup: (e: React.FormEvent) => Promise<void>;
  groupName: string;
  setGroupName: (value: string) => void;
}

function GroupForm({ submitGroup, groupName, setGroupName }: GroupFormProps) {
  return (
    <div className="p-4">
      <form onSubmit={submitGroup}>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="w-full p-2 border border-nord3 rounded-md focus:outline-none focus:border-nord8"
        />
        <button
          type="submit"
          className="mt-2 p-2 w-full bg-nord7 text-nord6 rounded-md hover:bg-nord8"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}

export default GroupForm;
