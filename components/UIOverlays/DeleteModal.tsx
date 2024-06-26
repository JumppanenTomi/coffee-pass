interface DeleteModalProps {
  modal: boolean,
  isMutating: boolean,
  handleChange: () => void,
  handleDelete: () => void,
  type: string,
}

/**
 * Delete modal custom component for admin side. Used on stamps, vouchers and voucher types
 * @param modal - Boolean value for showing the modal and dimming the background
 * @param isMutating - Boolean value that changes the confirm button text when the button is clicked
 * @param handleChange - Function that changes the modal boolean value to show and hide the modal
 * @param handleDelete - Function that executes when the delete confirmation button is clicked
 * @param type - String for describing what is being deleted (stamp, voucher or voucher type)
 * @returns DeleteModal custom component
 */
export default function DeleteModal({ modal, isMutating, handleChange, handleDelete, type }: DeleteModalProps ) {
  return (
    <div>
      <div
        className={`fixed inset-0 z-10 ${modal ? "" : "hidden"
          } bg-gray-900/50 dark:bg-gray-900/60`}
        id="sidebarBackdrop"
        onClick={handleChange}
      ></div>

      <div
        id="deleteModal"
        className={`
          ${modal ? "" : "hidden"} 
        flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full
        `}
      >
        <div className="relative w-full h-full max-w-md p-4 md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleChange}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this {type}?
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="btn-secondary" onClick={handleChange}>
                No, cancel
              </button>
              {isMutating ? (
                <button className="btn-primary" disabled>
                  Deleting...
                </button>
              ) : (
                <button className="btn-primary" onClick={handleDelete}>
                  Yes, I'm sure
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}