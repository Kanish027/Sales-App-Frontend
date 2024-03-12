import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { usePagination, useTable } from "react-table";
import { getAllProducts } from "../actions/Products";
import { Column } from "./Column";

const TopFiveSales = () => {
  const dispatch = useDispatch();
  // Accessing authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);
  // Accessing products data from Redux store
  const { isLoading, products: data } = useSelector((state) => state.products);

  useEffect(() => {
    // Dispatch action to fetch all products
    dispatch(getAllProducts());
  }, [dispatch]);

  // Memoized sorting of data by sale_amount in descending order
  const sortedData = useMemo(() => {
    if (!data) return []; // Return empty array if products are not fetched yet
    // Sort products by sale_amount in descending order
    return data.slice().sort((a, b) => b.saleAmount - a.saleAmount);
  }, [data]);

  // Memoized column definition
  const columns = useMemo(() => Column(), []);
  // React Table hook for table functionality and pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    prepareRow,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data: sortedData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  // Calculate visible page links based on the current page index
  const pageLinks = [...Array(Math.ceil(sortedData.length / pageSize)).keys()];

  let visiblePageLinks;
  if (pageIndex < 1) {
    visiblePageLinks = pageLinks.slice(0, 3);
  } else if (pageIndex > pageLinks.length - 2) {
    visiblePageLinks = pageLinks.slice(-3);
  } else {
    visiblePageLinks = pageLinks.slice(pageIndex - 1, pageIndex + 2);
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Render the TopFiveSales component
  return (
    <div className="container-fluid">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2 className="text-center fw-bold text-uppercase mb-4 pt-3">
              Top Five Sales
            </h2>
            {/* Render the table with React Table props */}
            <div className="table-responsive">
              <table
                {...getTableProps()}
                className="table table-hover table-bordered"
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination controls */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item ${!canPreviousPage ? "disabled" : ""}`}
                >
                  <button
                    className="page-link text-dark"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Previous
                  </button>
                </li>
                {visiblePageLinks.map((i) => (
                  <li
                    key={i}
                    className={`page-item ${pageIndex === i ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => gotoPage(i)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${!canNextPage ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopFiveSales;
