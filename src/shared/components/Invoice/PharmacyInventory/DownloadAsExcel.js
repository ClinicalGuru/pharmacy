import React from 'react';
import * as XLSX from 'xlsx';
import { CButton } from "../../Button/index"

export const DownloadExcel = ({ data }) => {
    const generateExcel = () => {
        const headers = [
            "Serial Number",
            "Brand Name",
            "Batch No",
            "Expiry Date",
            "Units Or Strips",
            "Net Price",
            "Discount",
            "Number Of Strips",
            "Dead Stock Quantity Check",
            "HSN Code",
            "GST",
            "Price Per Strip",
            "Price Per Unit",
            "MRP Per Strip",
            "Free Strips",
        ];

        // Add serial numbers and prepare rows
        const rows = data.map((item, index) => ({
            serialNumber: index + 1,
            brandName: item.brandName,
            batchNo: item.batchNo,
            expiry: item.expiry,
            unitsOrStrips: item.unitsOrStrips,
            netPrice: item.netPrice,
            discount: item.discount,
            noOfStrips: item.noOfStrips,
            deadStockQuantityCheck: item.deadStockQuantityCheck,
            hsnCode: item.hsnCode,
            gst: item.gst,
            pricePerStrip: item.pricePerStrip,
            pricePerUnit: item.pricePerUnit,
            stockEnteredDate: item.stockEnteredDate,
            mrpPerStrip: item.mrpPerStrip,
            freeStrips: item.freeStrips,
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');

        // Export the Excel file
        XLSX.writeFile(workbook, 'inventory.xlsx');
    };

    return (
        <div>
            <CButton type="submit" variant='contained'  buttonHandler={generateExcel} style={{ marginRight: '10px' }} text="Download as Excel" />
            {/* <button type='' buttonHandler={generateExcel}>Download Excel</button> */}
        </div>
    );
};

