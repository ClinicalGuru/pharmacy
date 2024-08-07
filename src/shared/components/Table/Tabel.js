import React from "react";

import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import "./Table.css";

export const Table = ({ headArray, gridArray, dataCallback = () => { }, deleteRow = () => {} }) => {
  const action = (i) => {
    dataCallback(gridArray[i], i);
  }

  const handleDelete = (i) => {
    deleteRow(i);
  }


  return (
    <div >
      <table>
        <thead>

          <tr>
            <th style={{ backgroundColor: '#B4B4B4' }}>S.No</th>
            {
              headArray && headArray.map(item => <th className="expand" style={{ backgroundColor: '#B4B4B4' }}>{item?.Header || item?.head}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {gridArray && gridArray?.map((row, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                {
                  headArray && headArray?.map((item) => item?.Header !== 'Actions' && <td className="expand">{row[item?.accessor]}</td>)
                }
                {
                  headArray && headArray?.map((item) => item?.Header === 'Actions' &&
                    <td>
                      <span className="actions">
                        <EditSharpIcon
                          color="primary"
                          onClick={() => action(i)}
                        />
                        <DeleteOutlineSharpIcon
                          color="error"
                          onClick={() => handleDelete(i)}
                        />
                      </span>
                    </td>)
                }
              </tr>
            )
          })}
          {gridArray?.length === 0 && <div>No data available</div>}
        </tbody>
      </table>
    </div>
  );
};