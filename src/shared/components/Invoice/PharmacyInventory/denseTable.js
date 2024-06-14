import React from "react";
import { monthsBetween } from '../../../../utils/helper';
import WarningIcon from '@mui/icons-material/Warning';
import EventBusySharpIcon from '@mui/icons-material/EventBusySharp';
import { ArrowTooltips } from '../../Tooltip/Tooltip';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import moment from 'moment'

export const InventoryTable = ({ headArray, gridArray }) => {

  const checkForExpiry = (expiry) => {
    const [year, month] = expiry.split('/').map(Number);
    const expiryDate = new Date(year, month - 1);
    const today = new Date();
    return monthsBetween(expiryDate, today);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            {
              headArray && headArray.map(item => <th className="expand">{item?.Header || item?.head}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {gridArray && gridArray?.map((row, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td><p style={{ margin: 0 }}>{row?.brandName}</p>
                  <small><i>{row?.pharmacologicalName}</i></small>
                </td>
                {/* <td>{row?.invoiceNumber}</td> */}
                <td>{row?.batchNo}</td>
                <td>{row?.expiry}</td>
                <td>{row?.mrpPerStrip}</td>
                <td>{row?.discount}</td>
                <td>{row?.pricePerStrip}</td>
                <td>{row?.unitsOrStrips}</td>
                <td>{row?.pricePerUnit}</td>
                <td>{row?.unitsInStock}</td>
                <td>{row?.gst}</td>
                {/* {<td >{
                  checkForExpiry(row?.expiry) > 6 ? <ArrowTooltips title={`In stock`}><DoneSharpIcon color="success"/></ArrowTooltips> :
                    <ArrowTooltips title={`Expires in ${checkForExpiry(row?.expiry)} months`}><EventBusySharpIcon color="error" /></ArrowTooltips>}
                </td>} */}
              </tr>
            )
          })}
          {gridArray?.length === 0 && <div>No data available</div>}
        </tbody>
      </table>
    </div>
  );
};