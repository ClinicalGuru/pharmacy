export const PrintBill = ({
    billDetails,
    patientDetails,
    medicineDetails
}) => {
    console.log(billDetails, patientDetails, medicineDetails, 'billDetails')
    const {
        discount,
        gst,
        netPrice = 0,
        roundOff = 0,
        billAmount = 0,
        paymentMode,
        remarks,
        expiry
    } = billDetails;
    const currentDate = new Date().toISOString().split("T")[0];
    const printContent = `
    <div class = 'header_sec'>
        <h1 class='heading'> LAXMI MEDICALS</h1>
        <p> 10/166, Railway koduru, Annamayya Dist - 516101</p> 
        <p>+91 9000415599</p>
    </div>
    <hr>
    <div class = 'patient_sec'>
       <div>
            <p><b>Patient Name:</b> ${patientDetails?.patientName}</p>
            <p><b>Phone:</b> ${patientDetails?.phone}</p>
            <p><b>Referred Doctor:</b> ${patientDetails?.referredDoctor}</p>
        </div>
        <div>
            <p><b>Bill Number:</b></p>
            <p><b>Bill Date:</b> ${currentDate}</p>
            <p><b>Status:</b></p>
        </div>
    </div>
       <hr> 
        <table>
            <thead>
                <tr>
                    <th>S.NO</th>
                    <th>Item</th>
                    <th>Batch No</th>
                    <th>HSN Code</th>
                    <th>Expiry</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${medicineDetails.map((row, i) => `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${row?.brandName}</td>
                        <td>${row?.batchNo}</td>
                        <td>${row?.hsnCode}</td>
                        <td>${row?.expiry}</td>
                        <td>${row?.pricePerUnit}</td>
                        <td>${row?.quantity}</td>
                        <td>${row?.discount}</td>
                        <td>${row?.amount}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <hr>
        <div class = 'billing_sec'>
        <p> <b> Total Bill Amount:</b> ${netPrice}</p>
        <p> <b>  Round Off:</b>${Number(roundOff)?.toFixed(2)} </p>
        <p> <b> Payable Amount:</b>${billAmount} </p>
        <p> <b> Recieved Amount:</b></p>
        <p> <b> Balance Amount:</b> </p>
        </div>

    `;

    let popupWin = window?.open('', '_blank', 'width=600,height=600');
    popupWin?.document.open();
    popupWin?.document.write(`
        <html>
            <head>
                <style>
                .header_sec{
                    text-align: center;
                }
                .heading {
                    font-size: 400%;
                    color: #155263;
                }
                .billing_sec {
                    text-align: end;
                }
                .patient_sec {
                    display: flex;
                    justify-content: space-between;
                }
            ]   table {
                        width: 100%;
                        border-collapse: collapse;
                }
                th, td {
                        text-align: left;
                        padding: 5px 8px;
                }
                thead {
                        background-color: #ececec;
                }
                h1,p {
                    margin-bottom: 0px!important
                }

                </style>
            </head>
            <body onload="window.print();">${printContent}</body>
        </html>
    `);
    popupWin?.document?.close();
}