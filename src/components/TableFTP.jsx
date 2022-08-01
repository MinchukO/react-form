import React, {useMemo} from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from '../data/MOCK_DATA.json'
import {COLUMNS} from './columns'
import './table.css'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";


const TableFTP = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, []);
  
  const tableInstance = useTable({
    columns: COLUMNS,
    data: MOCK_DATA,
  },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = tableInstance

  const { pageIndex } = state;
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          {...getTableProps()}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell align="right" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        align="right"
                        {...cell.getCellProps()}
                        component="th"
                        scope="row"
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div class="pogination">
        <span>
          Page <strong>{pageIndex + 1}</strong> of {pageOptions.length}
        </span>
        {/*<Button
          variant="text"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >{`<`}</Button>*/}
        <span className="paginationBtn">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {`<`}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {`>`}
          </button>
        </span>
      </div>
    </>
  );
}

export default TableFTP;
