// Importing the format function from date-fns for date formatting
import { format } from "date-fns";
// Column configuration for displaying sales data in a table
export const Column = () => [
  // Column for displaying row number
  {
    Header: "No.",
    accessor: "rowNumber",
    Cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  // Column for displaying Sales ID
  {
    Header: "Sales ID",
    accessor: "_id",
  },
  // Column for displaying Product Name with ellipsis for overflow
  {
    Header: "Product Name",
    accessor: "productName",
    Cell: ({ value }) => (
      <div
        style={{ width: "150px", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {value}
      </div>
    ),
  },
  // Column for displaying Quantity
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  // Column for displaying Sale Amount
  {
    Header: "Sale Amount",
    accessor: "saleAmount",
  },
  // Column for displaying Purchased Date with date formatting and ellipsis for overflowF
  {
    Header: "Purchased Date",
    accessor: "createdAt",
    Cell: ({ value }) => (
      <div
        style={{ width: "150px", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {format(new Date(value), "yyyy-MM-dd")}
      </div>
    ),
  },
];
