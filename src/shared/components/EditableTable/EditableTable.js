import React, { useState, forwardRef } from "react";
import { useTable, useRowSelect } from "react-table";

export const EditableTable = ({ columns, data, setData, handleButtonClick, hideColumns = [], selectedRows = () => {} }) => {

  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )
  // console.log(hideColumns, 'hideColumns = []')
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
    toggleAllRowsSelected, // Function to toggle all row selections

  } = useTable(
    {
      columns,
      data,
      initialState: { selectedRowIds: {}, hiddenColumns: hideColumns }, // Initial state for row selection
    },
    useRowSelect, // Adding useRowSelect hook
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  );

  const handleInputChange = (event, row, columnId) => {
    // console.log(data, 'editable table')
    const newData = data.map((rowData) => {
      if (rowData.medicineId === row.original.medicineId) {
        return { ...rowData, [columnId]: event.target.value };
      }
      return rowData;
    });
    setData(newData);
  };
  selectedRows(selectedRowIds);
  return (
    <table {...getTableProps()} style={{ border: "solid 1px gray", width: "100%" }}>
      <thead>
        <tr>
          {/* <th>
            <input
              type="checkbox"
              checked={Object?.keys(selectedRowIds)?.length === rows?.length}
              onChange={toggleSelectAll}
            />
          </th> */}
          {headerGroups.map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "0.5rem",
                    color: "black",
                    fontWeight: "bold",
                    backgroundColor: "#DEE1E6FF",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {/* <td>
                <input
                  type="checkbox"
                  {...row.getToggleRowSelectedProps()}
                  checked={selectedRowIds[row.id]}
                />
              </td> */}
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.column.editEnable ? (
                      row.original.isEditing ? (
                        <input
                          type="text"
                          defaultValue={cell.value}
                          onChange={(e) => handleInputChange(e, row, cell.column.id)}
                        />
                      ) : (
                        cell.render("Cell")
                      )
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
