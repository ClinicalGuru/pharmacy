import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";

export const EditableTable = ({ columns, data, setData, handleButtonClick }) => {
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
      initialState: { selectedRowIds: {} }, // Initial state for row selection
    },
    useRowSelect // Adding useRowSelect hook
  );

  // Handler to toggle all row selections
  const toggleSelectAll = () => {
    const isAllSelected = Object.keys(selectedRowIds).length === rows.length;
    toggleAllRowsSelected(!isAllSelected);
  };

  // Handler to toggle individual row selection
  const toggleRowSelection = (rowId) => {
    const newSelectedRowIds = { ...selectedRowIds };
    if (newSelectedRowIds[rowId]) {
      delete newSelectedRowIds[rowId];
    } else {
      newSelectedRowIds[rowId] = true;
    }
    setData(rows.filter((row) => newSelectedRowIds[row.id]));
  };
  const handleInputChange = (event, row, columnId) => {
    console.log(data, 'editable table')
    const newData = data.map((rowData) => {
      if (rowData.medicineId === row.original.medicineId) {
        return { ...rowData, [columnId]: event.target.value };
      }
      return rowData;
    });
    setData(newData);
  };
  return (
    <table {...getTableProps()} style={{ border: "solid 1px gray", width: "100%" }}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={Object.keys(selectedRowIds).length === rows.length}
              onChange={toggleSelectAll}
            />
          </th>
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
              <td>
                <input
                  type="checkbox"
                  {...row.getToggleRowSelectedProps()}
                  checked={selectedRowIds[row.id]}
                />
              </td>
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
