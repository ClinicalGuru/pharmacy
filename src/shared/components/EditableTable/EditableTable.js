import React, { useState, forwardRef, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import Modal from 'react-modal';
import "./EditableTable.css"
import CloseIcon from '@mui/icons-material/Close';
import PaymentDetails from "../Purchases/PaymentDetails/PaymentDetails";
import { VendorList } from "../Reports/PurchaseReports/VendorList";
export const EditableTable = ({ columns, data, setData, handleButtonClick, hideColumns = [], selectedRows = () => { } }) => {
  const [selectedRowIdsState, setSelectedRowIdsState] = useState({});

  const gstOptions = [
    { name: '0%', value: '0%' },
    { name: '5%', value: '5%' },
    { name: '12%', value: '12%' },
    { name: '18%', value: '18%' },
    { name: '28%', value: '28%' }
  ];

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      initialState: { selectedRowIds: {}, hiddenColumns: hideColumns },
    },
    useRowSelect,
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

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function cellEvent(e, data) {
    if (data.column.popup == 'popup') {
      openModal()
    }
  }

  const handleInputChange = (event, row, columnId) => {
    const newData = data.map((rowData) => {
      if (rowData.medicineId === row.original.medicineId) {
        return { ...rowData, [columnId]: event.target.value };
      }
      return rowData;
    });
    setData(newData);
  };

  const handleSelectChange = (event, row, columnId) => {
    const newData = data.map((rowData) => {
      if (rowData.medicineId === row.original.medicineId) {
        return { ...rowData, [columnId]: event.target.value };
      }
      return rowData;
    });
    setData(newData);
  };

  useEffect(() => {
    selectedRows(selectedRowIds);
  }, [selectedRowIds]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div>
          <div className="popup-heading-x">
            <div className="popup-heading">Payment Details</div>
            <div className="popup-x"><CloseIcon onClick={closeModal} /></div>
          </div>
          <div>
            <PaymentDetails />
          </div>
        </div>
      </Modal>
      <table {...getTableProps()} style={{
        overflow: 'hidden',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        boxShadow: '0px 5px 10px #ccc',
        borderRadius: '10px',
        width: '100%',
        margin: 'auto',
        tableLayout: 'auto',
        overflowX: 'auto',
      }}>
        <thead>
          <tr>
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
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      onClick={(e) => { cellEvent(e, cell) }}
                      style={{
                        padding: "10px",
                        textAlign: "center"
                      }}
                    >
                      {cell.column.editEnable ? (
                        row.original.isEditing ? (
                          cell.column.id === 'gst' ? (
                            <select
                              value={cell.value}
                              onChange={(e) => handleSelectChange(e, row, cell.column.id)}
                            >
                              {gstOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.name}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              defaultValue={cell.value}
                              onChange={(e) => handleInputChange(e, row, cell.column.id)}
                            />
                          )
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
    </div>
  );
};