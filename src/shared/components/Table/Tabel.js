import React from "react";

import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import "./Table.css";

export const Table = ({ headArray, gridArray }) => {
  // console.log(headArray, gridArray);
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>

          <tr>
            <th>S.No</th>
            {
              headArray && headArray.map(item => <th className="expand">{item?.head}</th>)
            }
            {
              headArray && headArray?.head === "Action" && <th>
                Action
              </th>
            }
          </tr>
        </thead>
        <tbody>
          {gridArray && gridArray?.map((row, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                {
                  headArray && headArray?.map(item => <td className="expand">{row[item?.fieldName]}</td>)
                }
                {
                  headArray && headArray?.head === "Action" && <td>
                    <span className="actions">
                      <EditSharpIcon
                        className="delete-btn"
                        onClick={() => alert()}
                      />
                      <DeleteOutlineSharpIcon
                        className="edit-btn"
                        onClick={() => alert()}
                      />
                    </span>
                  </td>
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