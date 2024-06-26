interface AdminAddModalButtonProps {
  title: string,
  handleChange: () => void
}

/**
 * Renders a button component for an admin modal with a title and a change event handler.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the button.
 * @param {Function} props.handleChange - The event handler for the button click.
 * @returns {JSX.Element} The rendered button component.
 */
export default function AdminAddModalButton({ title, handleChange }: AdminAddModalButtonProps) {
  return (
    <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
    </div>
  );
}