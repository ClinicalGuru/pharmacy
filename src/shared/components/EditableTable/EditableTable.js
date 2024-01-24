import React, { useState } from "react";
import { useTable } from "react-table";

export const EditableTable = ({ columns, data, setData, handleButtonClick }) => {
    console.log(data, 'data')
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const handleInputChange = (event, row, columnId) => {
    const newData = data.map((rowData) => {
      if (rowData.id === row.original.id) {
        return { ...rowData, [columnId]: event.target.value };
      }
      return rowData;
    });
    setData(newData);
  };

  return (
    <table {...getTableProps()} style={{ border: "solid 1px gray" , width: '100%'}}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  padding: '0.5rem',
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor:'#DEE1E6FF'
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
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
                          onChange={(e) =>
                            handleInputChange(e, row, cell.column.id)
                          }
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

