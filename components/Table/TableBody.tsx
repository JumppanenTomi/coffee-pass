import { ChangeEvent } from "react";
const _ = require("lodash");

/**
 * Handles the display of labels for a given row and head cell.
 * 
 * @param row - The row object.
 * @param headCell - The head cell object.
 * @returns The label to be displayed.
 */
const handleShowLabel = (row: any, headCell: HeadCell) => {
  const value = _.get(row, headCell.id);

  if (headCell.type == "datetime") {
    return new Date(value).toLocaleString();
  } else if (headCell.type == "boolean") {
    return value ? "Yes" : "No";
  } else {
    return value;
  }
};

export interface HeadCell {
  id: string;
  label: string;
  type: string;
}

/**
 * Renders the body of a table.
 *
 * @param data - The array of data to be rendered in the table.
 * @param rowKey - The key used to identify each row in the data array.
 * @param headCells - An array of objects representing the table's header cells.
 * @param handleSelectClick - A function to handle the click event on the select checkbox.
 * @param isSelected - A function to determine if a row is selected.
 * @returns The rendered table body.
 */
export default function TableBody({
  data,
  rowKey,
  headCells,
  handleSelectClick,
  isSelected,
}: {
  data: any[];
  rowKey: string;
  headCells: readonly HeadCell[];
  handleSelectClick: (event: React.ChangeEvent<unknown>, id: number) => void;
  isSelected: (id: number) => boolean;
}) {
  return (
    <tbody>
      {data.map((row, index) => (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                onChange={(e: ChangeEvent<unknown>) =>
                  handleSelectClick(e, row[rowKey])
                }
                checked={isSelected(row[rowKey])}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-table-search-1" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          {headCells.map((headCell) => (
            <td
              key={headCell.id}
              className="px-6 py-4"
              suppressHydrationWarning
            >
              {handleShowLabel(row, headCell)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
