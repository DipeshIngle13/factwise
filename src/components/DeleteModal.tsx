const DeleteModal = ({ isOpen, onClose, onConfirmDelete }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded shadow-lg p-4 w-[40vw]">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-800 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p className="mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-800 font-normal px-6 py-1 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDelete}
            className="bg-red-500 hover:bg-red-500 text-white font-semibold px-6 py-1 rounded-lg "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
